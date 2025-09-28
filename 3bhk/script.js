(function(){
    var script = {
 "paddingTop": 0,
 "id": "rootPlayer",
 "mobileMipmappingEnabled": false,
 "children": [
  "this.MainViewer"
 ],
 "defaultVRPointer": "laser",
 "contentOpaque": false,
 "scrollBarMargin": 2,
 "scripts": {
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "getKey": function(key){  return window[key]; },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "existsKey": function(key){  return key in window; },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "unregisterKey": function(key){  delete window[key]; },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "registerKey": function(key, value){  window[key] = value; },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } }
 },
 "downloadEnabled": false,
 "width": "100%",
 "class": "Player",
 "layout": "absolute",
 "start": "this.init()",
 "paddingBottom": 0,
 "borderSize": 0,
 "paddingRight": 0,
 "borderRadius": 0,
 "verticalAlign": "top",
 "minHeight": 20,
 "paddingLeft": 0,
 "propagateClick": false,
 "scrollBarWidth": 10,
 "height": "100%",
 "desktopMipmappingEnabled": false,
 "definitions": [{
 "hfov": 360,
 "vfov": 180,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0DDD37F8_019B_0738_4165_2278D9DB7F90_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_0DDD37F8_019B_0738_4165_2278D9DB7F90_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0DDD37F8_019B_0738_4165_2278D9DB7F90_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_0DDD37F8_019B_0738_4165_2278D9DB7F90_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_0DDD37F8_019B_0738_4165_2278D9DB7F90_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0DDD37F8_019B_0738_4165_2278D9DB7F90_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_0DDD37F8_019B_0738_4165_2278D9DB7F90_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_0DDD37F8_019B_0738_4165_2278D9DB7F90_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0DDD37F8_019B_0738_4165_2278D9DB7F90_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_0DDD37F8_019B_0738_4165_2278D9DB7F90_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0DDD37F8_019B_0738_4165_2278D9DB7F90_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_0DDD37F8_019B_0738_4165_2278D9DB7F90_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_0DDD37F8_019B_0738_4165_2278D9DB7F90_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0DDD37F8_019B_0738_4165_2278D9DB7F90_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_0DDD37F8_019B_0738_4165_2278D9DB7F90_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_0DDD37F8_019B_0738_4165_2278D9DB7F90_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0DDD37F8_019B_0738_4165_2278D9DB7F90_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "label": "Powder toilet 3BHK",
 "id": "panorama_0DDD37F8_019B_0738_4165_2278D9DB7F90",
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_0DDD37F8_019B_0738_4165_2278D9DB7F90_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_0EC38AAB_019F_09D8_4148_F13840F3A30E"
 ],
 "hfovMax": 130
},
{
 "label": "3bhk bedroom02 2 28th",
 "id": "panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_DF50E086_C674_38C1_41C4_7464DFF3A926",
  "this.overlay_DFC10996_C674_48CE_41D4_631A257C6571"
 ],
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "adjacentPanoramas": [
  {
   "yaw": -148.21,
   "panorama": "this.panorama_3FF204B8_32AD_FD8A_41C8_A348279F77D9",
   "backwardYaw": 135.28,
   "class": "AdjacentPanorama",
   "distance": 1
  },
  {
   "yaw": -21.75,
   "panorama": "this.panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5",
   "backwardYaw": 88.07,
   "class": "AdjacentPanorama",
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 140
},
{
 "label": "3bhk 02 entrance 33rd floor",
 "id": "panorama_3E110129_32A4_548A_41A6_17FA339053A0",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_3E110129_32A4_548A_41A6_17FA339053A0_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_116E2FDA_337C_6B8E_41AD_4671109176B5",
  "this.overlay_11C51F4E_337C_EC86_41A2_7813FDA2140E",
  "this.overlay_106A55D6_337D_FF86_4174_0A0E29237D58"
 ],
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E110129_32A4_548A_41A6_17FA339053A0_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_3E110129_32A4_548A_41A6_17FA339053A0_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_3E110129_32A4_548A_41A6_17FA339053A0_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_3E110129_32A4_548A_41A6_17FA339053A0_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_3E110129_32A4_548A_41A6_17FA339053A0_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_3E110129_32A4_548A_41A6_17FA339053A0_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_3E110129_32A4_548A_41A6_17FA339053A0_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_3E110129_32A4_548A_41A6_17FA339053A0_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_3E110129_32A4_548A_41A6_17FA339053A0_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_3E110129_32A4_548A_41A6_17FA339053A0_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_3E110129_32A4_548A_41A6_17FA339053A0_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_3E110129_32A4_548A_41A6_17FA339053A0_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_3E110129_32A4_548A_41A6_17FA339053A0_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_3E110129_32A4_548A_41A6_17FA339053A0_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_3E110129_32A4_548A_41A6_17FA339053A0_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_3E110129_32A4_548A_41A6_17FA339053A0_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_3E110129_32A4_548A_41A6_17FA339053A0_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "adjacentPanoramas": [
  {
   "yaw": 126.16,
   "panorama": "this.panorama_3E3FB1E6_32A7_D786_41C1_CD16D7C1F309",
   "backwardYaw": 155.44,
   "class": "AdjacentPanorama",
   "distance": 1
  },
  {
   "yaw": -55.99,
   "panorama": "this.panorama_0F2964AA_0199_39D8_415C_DAB75F704D09",
   "backwardYaw": 107.93,
   "class": "AdjacentPanorama",
   "distance": 1
  },
  {
   "yaw": 6.33,
   "panorama": "this.panorama_3E24D2BF_32A4_D587_4192_FCC0A640BC00",
   "backwardYaw": -3.22,
   "class": "AdjacentPanorama",
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 140
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": 174.52,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_80E0A0ED_8CB4_B9E9_41BE_5C629173241E"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4_camera"
},
{
 "label": "3bhk bedroom01 17th",
 "id": "panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_D1422BDB_C3F3_88E2_41BD_FA3D9EE50658"
 ],
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "adjacentPanoramas": [
  {
   "yaw": -64.1,
   "panorama": "this.panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5",
   "backwardYaw": 35.42,
   "class": "AdjacentPanorama",
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": -136.2,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_83E6D2F7_8CB4_B9F9_41D4_F84CBE9F2C02"
},
{
 "label": "3bhk bedroom02 2 23rd",
 "id": "panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_D409C066_C655_F841_41C2_9E382AAA888D",
  "this.overlay_D4F58EF9_C654_C843_41C9_E71581556A11"
 ],
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "adjacentPanoramas": [
  {
   "yaw": -145.19,
   "panorama": "this.panorama_3F79A584_32AC_5C7A_419D_E5B5EC2463D0",
   "backwardYaw": 133.78,
   "class": "AdjacentPanorama",
   "distance": 1
  },
  {
   "yaw": -20.79,
   "panorama": "this.panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9",
   "backwardYaw": 75.99,
   "class": "AdjacentPanorama",
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 140
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6_camera"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 26.51,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 26.51,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 26.51,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": -104.01,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_8035D10E_8CB4_B82A_41D1_8FA9C49834B2"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 135,
  "yaw": -118.44,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_83E89300_8CB4_B817_41CA_1EC2AABFEDF2"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": -62.27,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_83D63067_8CB4_B81A_41DD_97F69DA6F174"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": -72.07,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_817AC1CD_8CB4_B82E_41D1_7E7F8648923B"
},
{
 "label": "3bhk bedroom03 02 106th",
 "id": "panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_E24DF921_C64C_C9C3_41E0_1DE050A43B4D",
  "this.overlay_12D086AB_0608_6236_4191_C3F4174FECF3"
 ],
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_12B1E6F5_004A_E8DE_4153_B75256AABCDC"
  },
  {
   "yaw": -49.96,
   "panorama": "this.panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0",
   "backwardYaw": 37.62,
   "class": "AdjacentPanorama",
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 140
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": 176.78,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_816D41D5_8CB4_B83E_41B2_49758F0C5737"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 135,
  "yaw": 48.37,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_802F43BE_8CB4_B86A_41C1_B05765809B7D"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 135,
  "yaw": -119.57,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_8265D2AA_8CB4_B86A_41C0_3B733AEC387A"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_0EF390FE_019F_1938_4173_7E5BC178F7F6_camera"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": 171.08,
  "class": "PanoramaCameraPosition",
  "pitch": 1
 },
 "id": "panorama_3F570BCA_32AC_AB8E_418D_9A4B6CEEBAEF_camera"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_camera"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 26.51,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 26.51,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 26.51,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": 62.93,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_80421401_8CB4_B816_41E0_5451D52E8FE2"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40_camera"
},
{
 "label": "3bhk bedroom03 01 17th",
 "id": "panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_D7B8A38F_C3F7_B962_4174_75177DEADA11",
  "this.overlay_D7F45601_C3F0_BB5E_41C2_C0C993F67D5C"
 ],
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "adjacentPanoramas": [
  {
   "yaw": 153.25,
   "panorama": "this.panorama_C857B562_C391_99A2_41D4_622CFBF52C0A",
   "backwardYaw": 35.46,
   "class": "AdjacentPanorama",
   "distance": 1
  },
  {
   "yaw": 44.28,
   "panorama": "this.panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4",
   "backwardYaw": -50.85,
   "class": "AdjacentPanorama",
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 140
},
{
 "label": "3bhk 02 entrance 28th floor",
 "id": "panorama_3FE2707B_32AC_B48E_41C6_A7FCAE50A2B6",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_3FE2707B_32AC_B48E_41C6_A7FCAE50A2B6_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_2ACF84C0_3365_FDFA_41BD_59A171EDC470",
  "this.overlay_2AFC3B23_336B_B4BE_41BB_3885A3BF30E6",
  "this.overlay_299FD28A_336D_D589_41B8_F82AB0ACDC68"
 ],
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FE2707B_32AC_B48E_41C6_A7FCAE50A2B6_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_3FE2707B_32AC_B48E_41C6_A7FCAE50A2B6_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_3FE2707B_32AC_B48E_41C6_A7FCAE50A2B6_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_3FE2707B_32AC_B48E_41C6_A7FCAE50A2B6_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_3FE2707B_32AC_B48E_41C6_A7FCAE50A2B6_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_3FE2707B_32AC_B48E_41C6_A7FCAE50A2B6_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_3FE2707B_32AC_B48E_41C6_A7FCAE50A2B6_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_3FE2707B_32AC_B48E_41C6_A7FCAE50A2B6_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_3FE2707B_32AC_B48E_41C6_A7FCAE50A2B6_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_3FE2707B_32AC_B48E_41C6_A7FCAE50A2B6_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_3FE2707B_32AC_B48E_41C6_A7FCAE50A2B6_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_3FE2707B_32AC_B48E_41C6_A7FCAE50A2B6_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_3FE2707B_32AC_B48E_41C6_A7FCAE50A2B6_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_3FE2707B_32AC_B48E_41C6_A7FCAE50A2B6_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_3FE2707B_32AC_B48E_41C6_A7FCAE50A2B6_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_3FE2707B_32AC_B48E_41C6_A7FCAE50A2B6_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_3FE2707B_32AC_B48E_41C6_A7FCAE50A2B6_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "adjacentPanoramas": [
  {
   "yaw": 127.04,
   "panorama": "this.panorama_3FF204B8_32AD_FD8A_41C8_A348279F77D9",
   "backwardYaw": 148.66,
   "class": "AdjacentPanorama",
   "distance": 1
  },
  {
   "yaw": -56.87,
   "panorama": "this.panorama_0E9BEAA3_0199_09C8_416E_D3D5D37321FD",
   "backwardYaw": 105.8,
   "class": "AdjacentPanorama",
   "distance": 1
  },
  {
   "yaw": 5.32,
   "panorama": "this.panorama_3E3ACD8A_32AC_AF89_41C5_288091B6AF29",
   "backwardYaw": -6.11,
   "class": "AdjacentPanorama",
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 140
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_0B65F72F_0039_294A_413D_7167CFDDAD60_camera"
},
{
 "hfov": 360,
 "vfov": 180,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0EF390FE_019F_1938_4173_7E5BC178F7F6_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_0EF390FE_019F_1938_4173_7E5BC178F7F6_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0EF390FE_019F_1938_4173_7E5BC178F7F6_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_0EF390FE_019F_1938_4173_7E5BC178F7F6_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_0EF390FE_019F_1938_4173_7E5BC178F7F6_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0EF390FE_019F_1938_4173_7E5BC178F7F6_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_0EF390FE_019F_1938_4173_7E5BC178F7F6_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_0EF390FE_019F_1938_4173_7E5BC178F7F6_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0EF390FE_019F_1938_4173_7E5BC178F7F6_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_0EF390FE_019F_1938_4173_7E5BC178F7F6_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0EF390FE_019F_1938_4173_7E5BC178F7F6_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_0EF390FE_019F_1938_4173_7E5BC178F7F6_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_0EF390FE_019F_1938_4173_7E5BC178F7F6_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0EF390FE_019F_1938_4173_7E5BC178F7F6_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_0EF390FE_019F_1938_4173_7E5BC178F7F6_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_0EF390FE_019F_1938_4173_7E5BC178F7F6_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0EF390FE_019F_1938_4173_7E5BC178F7F6_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "label": "Powder toilet 3BHK",
 "id": "panorama_0EF390FE_019F_1938_4173_7E5BC178F7F6",
 "class": "Panorama",
 "adjacentPanoramas": [
  {
   "yaw": 103.66,
   "panorama": "this.panorama_3F570BCA_32AC_AB8E_418D_9A4B6CEEBAEF",
   "backwardYaw": -56.11,
   "class": "AdjacentPanorama",
   "distance": 1
  }
 ],
 "pitch": 0,
 "thumbnailUrl": "media/panorama_0EF390FE_019F_1938_4173_7E5BC178F7F6_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_11D521B2_019B_1BC8_416F_DC66A9296BC0"
 ],
 "hfovMax": 130
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 26.51,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 26.51,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 26.51,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": -146.98,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_806643E6_8CB4_B81A_41AE_CA0E4AB16B2E"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": -60.89,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_83859048_8CB4_B817_41C4_A98557DF6634"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 135,
  "yaw": -74.2,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_80583157_8CB4_B83A_41AA_22F5C57B0291"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 54.77,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_8012A127_8CB4_B819_41DB_DDD42FFB656E"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 97.42,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_81B7F40A_8CB4_B82B_41C5_38F7BA5AA823"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_camera"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": 98.65,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_81D5744F_8CB4_B829_41CA_6E10B9A6626B"
},
{
 "label": "3bhk kitchen",
 "id": "panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_DE130192_C67C_38C1_41C4_0A4C5ECF7BB5"
 ],
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "adjacentPanoramas": [
  {
   "yaw": 5.82,
   "panorama": "this.panorama_3E3ACD8A_32AC_AF89_41C5_288091B6AF29",
   "backwardYaw": -84.87,
   "class": "AdjacentPanorama",
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 140
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": 174.36,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_8392B03E_8CB4_B86B_41B4_7206B6336725"
},
{
 "label": "3bhk Passage 28th floor",
 "id": "panorama_3E3ACD8A_32AC_AF89_41C5_288091B6AF29",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_3E3ACD8A_32AC_AF89_41C5_288091B6AF29_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_2ECD8898_336B_B58A_41C3_B1EA3ED1BC44",
  "this.overlay_2D649786_336B_BC79_4177_4EF46C89C11B",
  "this.overlay_2C47FE1E_3364_AC86_41BD_92D8DE077FEE"
 ],
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E3ACD8A_32AC_AF89_41C5_288091B6AF29_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_3E3ACD8A_32AC_AF89_41C5_288091B6AF29_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_3E3ACD8A_32AC_AF89_41C5_288091B6AF29_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_3E3ACD8A_32AC_AF89_41C5_288091B6AF29_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_3E3ACD8A_32AC_AF89_41C5_288091B6AF29_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_3E3ACD8A_32AC_AF89_41C5_288091B6AF29_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_3E3ACD8A_32AC_AF89_41C5_288091B6AF29_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_3E3ACD8A_32AC_AF89_41C5_288091B6AF29_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_3E3ACD8A_32AC_AF89_41C5_288091B6AF29_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_3E3ACD8A_32AC_AF89_41C5_288091B6AF29_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_3E3ACD8A_32AC_AF89_41C5_288091B6AF29_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_3E3ACD8A_32AC_AF89_41C5_288091B6AF29_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_3E3ACD8A_32AC_AF89_41C5_288091B6AF29_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_3E3ACD8A_32AC_AF89_41C5_288091B6AF29_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_3E3ACD8A_32AC_AF89_41C5_288091B6AF29_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_3E3ACD8A_32AC_AF89_41C5_288091B6AF29_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_3E3ACD8A_32AC_AF89_41C5_288091B6AF29_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "adjacentPanoramas": [
  {
   "yaw": -6.11,
   "panorama": "this.panorama_3FE2707B_32AC_B48E_41C6_A7FCAE50A2B6",
   "backwardYaw": 5.32,
   "class": "AdjacentPanorama",
   "distance": 1
  },
  {
   "yaw": -84.87,
   "panorama": "this.panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9",
   "backwardYaw": 5.82,
   "class": "AdjacentPanorama",
   "distance": 1
  },
  {
   "yaw": 35.96,
   "panorama": "this.panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B",
   "backwardYaw": 151.46,
   "class": "AdjacentPanorama",
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 140
},
{
 "label": "3bhk bedroom02 28th",
 "id": "panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_DE78BD94_C67C_48C1_41E0_19E3E3F56405",
  "this.overlay_DEFD2A97_C674_C8CF_41E4_A52F962F63C7",
  "this.overlay_1253AE9D_3364_6D8B_41C1_543577C932F6"
 ],
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "adjacentPanoramas": [
  {
   "yaw": -158.16,
   "panorama": "this.panorama_3FF204B8_32AD_FD8A_41C8_A348279F77D9",
   "backwardYaw": -125.48,
   "class": "AdjacentPanorama",
   "distance": 1
  },
  {
   "yaw": 39.47,
   "panorama": "this.panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5",
   "backwardYaw": -65.68,
   "class": "AdjacentPanorama",
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_118B7384_0049_E93E_4136_7E71C475A6E0"
  }
 ],
 "vfov": 180,
 "hfovMax": 140
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": -26.75,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_8212428E_8CB4_B82A_4183_542CC2D53DAB"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 125,
  "yaw": -175.28,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_82028297_8CB4_B83A_41C4_B1D61921E378"
},
{
 "mouseControlMode": "drag_acceleration",
 "gyroscopeVerticalDraggingEnabled": true,
 "viewerArea": "this.MainViewer",
 "class": "PanoramaPlayer",
 "displayPlaybackBar": true,
 "id": "MainViewerPanoramaPlayer",
 "touchControlMode": "drag_rotation"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": 173.89,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_804A315F_8CB4_B82A_41C0_CD029088EBE1"
},
{
 "label": "3bhk bedroom02 2 17th",
 "id": "panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_D06F55C7_C3F0_98E2_41E3_464100BECDC1",
  "this.overlay_09FA2596_0678_A611_4196_27395AC63D08"
 ],
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "adjacentPanoramas": [
  {
   "yaw": 119.11,
   "panorama": "this.panorama_0B65F72F_0039_294A_413D_7167CFDDAD60",
   "backwardYaw": -130.12,
   "class": "AdjacentPanorama",
   "distance": 1
  },
  {
   "yaw": 88.82,
   "panorama": "this.panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9",
   "backwardYaw": -21.06,
   "class": "AdjacentPanorama",
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 140
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5_camera"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 120,
  "yaw": 170.56,
  "class": "PanoramaCameraPosition",
  "pitch": 0.22
 },
 "id": "panorama_3E51A3EA_329B_DB8E_41B3_D516BBB498CC_camera"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": 154.98,
  "class": "PanoramaCameraPosition",
  "pitch": -1.17
 },
 "id": "panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9_camera"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": 176.37,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_802F111F_8CB4_B829_41E0_6E60454175BE"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": 38.44,
  "class": "PanoramaCameraPosition",
  "pitch": 1.65
 },
 "id": "panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_camera"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": 124.01,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_829E6213_8CB4_B83A_41AE_CB9E592E5F9C"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": 149.35,
  "class": "PanoramaCameraPosition",
  "pitch": 0.82
 },
 "id": "panorama_E609D5D6_C65C_5841_41DC_4408506ECD34_camera"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": 34.81,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_80CE339B_8CB4_B829_41D5_3539D07CE540"
},
{
 "label": "3bhk bedroom02 2 33rd",
 "id": "panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_E468F0B7_C654_58CF_41DE_C89AEED028EF",
  "this.overlay_E4E80CAC_C657_C8C1_41D8_7F180578F07D"
 ],
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A"
  },
  {
   "yaw": -145.32,
   "panorama": "this.panorama_3E3FB1E6_32A7_D786_41C1_CD16D7C1F309",
   "backwardYaw": 133.52,
   "class": "AdjacentPanorama",
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 140
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 128,
  "yaw": 64.69,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_8018B3CE_8CB4_B82A_4193_D2702F8511C0"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 128,
  "yaw": 42.21,
  "class": "PanoramaCameraPosition",
  "pitch": 1.51
 },
 "id": "panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_camera"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": -173.63,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_8135D1A6_8CB4_B81A_41D5_B17DA644CF46"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_118D55D0_004A_E8D6_412B_F15016B43EC0_camera"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_3E3FB1E6_32A7_D786_41C1_CD16D7C1F309_camera"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": 167.56,
  "class": "PanoramaCameraPosition",
  "pitch": -4.27
 },
 "id": "panorama_0B55BDE4_0039_38FE_4139_E851DEBF7C58_camera"
},
{
 "hfov": 360,
 "vfov": 180,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "label": "3bhk Passage 17th floor",
 "id": "panorama_C857B562_C391_99A2_41D4_622CFBF52C0A",
 "class": "Panorama",
 "adjacentPanoramas": [
  {
   "yaw": 35.46,
   "panorama": "this.panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A",
   "backwardYaw": 153.25,
   "class": "AdjacentPanorama",
   "distance": 1
  },
  {
   "yaw": -82.58,
   "panorama": "this.panorama_CF1013BA_C391_98A2_4167_0505D502E364",
   "backwardYaw": 4.72,
   "class": "AdjacentPanorama",
   "distance": 1
  }
 ],
 "pitch": 0,
 "thumbnailUrl": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_D2F533D4_C3F3_98E5_41DC_C06241682CEA",
  "this.overlay_D20E5953_C3F1_89E3_41E2_DE390783024A",
  "this.overlay_D181A890_C3F0_977D_41E6_810868AFA24B"
 ],
 "hfovMax": 130
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": 118.58,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_808E00D4_8CB4_B83F_41D6_7AC83305A87C"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_camera"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_3CDB8152_32AC_549E_41C0_2EA6C9801032_camera"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 135,
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_118A5E95_004A_FB5E_414F_25F73E14E9E4_camera"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": 39.26,
  "class": "PanoramaCameraPosition",
  "pitch": 2.47
 },
 "id": "panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_camera"
},
{
 "label": "3bhk bedroom02 1 23rd",
 "id": "panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_D55AF350_C65C_5841_41E8_2583A752FBE8",
  "this.overlay_1788E5E3_0609_A636_4170_98106BB92308"
 ],
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "adjacentPanoramas": [
  {
   "yaw": 75.99,
   "panorama": "this.panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5",
   "backwardYaw": -20.79,
   "class": "AdjacentPanorama",
   "distance": 1
  },
  {
   "yaw": 118.11,
   "panorama": "this.panorama_11B27642_004A_EB3A_4142_7CBC8EFC0A22",
   "backwardYaw": -130.75,
   "class": "AdjacentPanorama",
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 140
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": 95.13,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_8039C3B6_8CB4_B87A_4194_634210D868BE"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": -135.72,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_8272B2A0_8CB4_B817_41DD_2B18E9DE8F7F"
},
{
 "label": "3bhk bedroom02 1 17th",
 "id": "panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_D0840BD8_C3F0_88ED_41D5_401F4C1D0F9A",
  "this.overlay_D0C5DA7D_C3F1_8BA7_41D0_40EE562498C3"
 ],
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "adjacentPanoramas": [
  {
   "yaw": -146.66,
   "panorama": "this.panorama_3E6FB4EF_32E5_BD87_4187_4E27487A5391",
   "backwardYaw": 134.28,
   "class": "AdjacentPanorama",
   "distance": 1
  },
  {
   "yaw": -21.06,
   "panorama": "this.panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40",
   "backwardYaw": 88.82,
   "class": "AdjacentPanorama",
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 140
},
{
 "label": "3BHK_Bolcony_28",
 "id": "panorama_3CDB8152_32AC_549E_41C0_2EA6C9801032",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_3CDB8152_32AC_549E_41C0_2EA6C9801032_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_2D68C2F0_336C_759A_41C7_B9B641CD3CD0"
 ],
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3CDB8152_32AC_549E_41C0_2EA6C9801032_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_3CDB8152_32AC_549E_41C0_2EA6C9801032_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_3CDB8152_32AC_549E_41C0_2EA6C9801032_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_3CDB8152_32AC_549E_41C0_2EA6C9801032_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_3CDB8152_32AC_549E_41C0_2EA6C9801032_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_3CDB8152_32AC_549E_41C0_2EA6C9801032_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_3CDB8152_32AC_549E_41C0_2EA6C9801032_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_3CDB8152_32AC_549E_41C0_2EA6C9801032_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_3CDB8152_32AC_549E_41C0_2EA6C9801032_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_3CDB8152_32AC_549E_41C0_2EA6C9801032_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_3CDB8152_32AC_549E_41C0_2EA6C9801032_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_3CDB8152_32AC_549E_41C0_2EA6C9801032_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_3CDB8152_32AC_549E_41C0_2EA6C9801032_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_3CDB8152_32AC_549E_41C0_2EA6C9801032_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_3CDB8152_32AC_549E_41C0_2EA6C9801032_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_3CDB8152_32AC_549E_41C0_2EA6C9801032_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_3CDB8152_32AC_549E_41C0_2EA6C9801032_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "adjacentPanoramas": [
  {
   "yaw": -170.07,
   "panorama": "this.panorama_3FF204B8_32AD_FD8A_41C8_A348279F77D9",
   "backwardYaw": -4.14,
   "class": "AdjacentPanorama",
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 140
},
{
 "label": "3bhk bedroom03 01 28th",
 "id": "panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_DC0C8682_C673_D8C1_41C9_3F738D8FB7A5",
  "this.overlay_DC8E5D89_C64C_48C3_41D0_5E147F703183"
 ],
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "adjacentPanoramas": [
  {
   "yaw": 34.74,
   "panorama": "this.panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6",
   "backwardYaw": -49.75,
   "class": "AdjacentPanorama",
   "distance": 1
  },
  {
   "yaw": 151.46,
   "panorama": "this.panorama_3E3ACD8A_32AC_AF89_41C5_288091B6AF29",
   "backwardYaw": 35.96,
   "class": "AdjacentPanorama",
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 140
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 120,
  "yaw": -52.96,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_819C0429_8CB4_B869_41E0_CA1614569CD1"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": 86.45,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_801283C6_8CB4_B81A_41D6_AEC7C3BC4219"
},
{
 "label": "3BHK_Bolcony_33",
 "id": "panorama_3E181019_32A4_748A_41C7_D30403307065",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_3E181019_32A4_748A_41C7_D30403307065_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_15B510C7_3364_7586_41C2_C6620CFBA961"
 ],
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E181019_32A4_748A_41C7_D30403307065_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_3E181019_32A4_748A_41C7_D30403307065_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_3E181019_32A4_748A_41C7_D30403307065_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_3E181019_32A4_748A_41C7_D30403307065_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_3E181019_32A4_748A_41C7_D30403307065_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_3E181019_32A4_748A_41C7_D30403307065_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_3E181019_32A4_748A_41C7_D30403307065_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_3E181019_32A4_748A_41C7_D30403307065_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_3E181019_32A4_748A_41C7_D30403307065_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_3E181019_32A4_748A_41C7_D30403307065_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_3E181019_32A4_748A_41C7_D30403307065_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_3E181019_32A4_748A_41C7_D30403307065_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_3E181019_32A4_748A_41C7_D30403307065_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_3E181019_32A4_748A_41C7_D30403307065_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_3E181019_32A4_748A_41C7_D30403307065_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_3E181019_32A4_748A_41C7_D30403307065_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_3E181019_32A4_748A_41C7_D30403307065_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "adjacentPanoramas": [
  {
   "yaw": -169.82,
   "panorama": "this.panorama_3E3FB1E6_32A7_D786_41C1_CD16D7C1F309",
   "backwardYaw": -4.64,
   "class": "AdjacentPanorama",
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 140
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": -24.56,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_810B21C5_8CB4_B81E_41B8_47DE3B12E5CA"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": 176.37,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_811851BE_8CB4_B86A_41B1_C3CEC6976550"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_camera"
},
{
 "label": "3bhk 01 hall 23rd floor",
 "id": "panorama_3F79A584_32AC_5C7A_419D_E5B5EC2463D0",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_3F79A584_32AC_5C7A_419D_E5B5EC2463D0_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_2174C738_32AC_DC8A_41C2_89736F4D71A4",
  "this.overlay_210F8527_32AD_FC86_41C4_BB25D69B9971",
  "this.overlay_26DF65B2_32AC_BF99_41C5_7D48F8DCF9AE",
  "this.overlay_26B64558_32A4_5C89_41C8_3CAB3D877518"
 ],
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F79A584_32AC_5C7A_419D_E5B5EC2463D0_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_3F79A584_32AC_5C7A_419D_E5B5EC2463D0_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_3F79A584_32AC_5C7A_419D_E5B5EC2463D0_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_3F79A584_32AC_5C7A_419D_E5B5EC2463D0_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_3F79A584_32AC_5C7A_419D_E5B5EC2463D0_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_3F79A584_32AC_5C7A_419D_E5B5EC2463D0_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_3F79A584_32AC_5C7A_419D_E5B5EC2463D0_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_3F79A584_32AC_5C7A_419D_E5B5EC2463D0_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_3F79A584_32AC_5C7A_419D_E5B5EC2463D0_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_3F79A584_32AC_5C7A_419D_E5B5EC2463D0_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_3F79A584_32AC_5C7A_419D_E5B5EC2463D0_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_3F79A584_32AC_5C7A_419D_E5B5EC2463D0_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_3F79A584_32AC_5C7A_419D_E5B5EC2463D0_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_3F79A584_32AC_5C7A_419D_E5B5EC2463D0_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_3F79A584_32AC_5C7A_419D_E5B5EC2463D0_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_3F79A584_32AC_5C7A_419D_E5B5EC2463D0_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_3F79A584_32AC_5C7A_419D_E5B5EC2463D0_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "adjacentPanoramas": [
  {
   "yaw": -124.47,
   "panorama": "this.panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590",
   "backwardYaw": -157.27,
   "class": "AdjacentPanorama",
   "distance": 1
  },
  {
   "yaw": 151.67,
   "panorama": "this.panorama_3F570BCA_32AC_AB8E_418D_9A4B6CEEBAEF",
   "backwardYaw": 125.78,
   "class": "AdjacentPanorama",
   "distance": 1
  },
  {
   "yaw": 133.78,
   "panorama": "this.panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5",
   "backwardYaw": -145.19,
   "class": "AdjacentPanorama",
   "distance": 1
  },
  {
   "yaw": -5.64,
   "panorama": "this.panorama_3E62E564_32A4_DCB9_41BD_32CA02213B87",
   "backwardYaw": -165.42,
   "class": "AdjacentPanorama",
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 140
},
{
 "label": "3bhk_bed2_toilet copy",
 "id": "panorama_118A5E95_004A_FB5E_414F_25F73E14E9E4",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_118A5E95_004A_FB5E_414F_25F73E14E9E4_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_1BA8B30A_004F_694A_4158_016311CE43BA"
 ],
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_118A5E95_004A_FB5E_414F_25F73E14E9E4_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_118A5E95_004A_FB5E_414F_25F73E14E9E4_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_118A5E95_004A_FB5E_414F_25F73E14E9E4_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_118A5E95_004A_FB5E_414F_25F73E14E9E4_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_118A5E95_004A_FB5E_414F_25F73E14E9E4_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_118A5E95_004A_FB5E_414F_25F73E14E9E4_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_118A5E95_004A_FB5E_414F_25F73E14E9E4_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_118A5E95_004A_FB5E_414F_25F73E14E9E4_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_118A5E95_004A_FB5E_414F_25F73E14E9E4_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_118A5E95_004A_FB5E_414F_25F73E14E9E4_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_118A5E95_004A_FB5E_414F_25F73E14E9E4_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_118A5E95_004A_FB5E_414F_25F73E14E9E4_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_118A5E95_004A_FB5E_414F_25F73E14E9E4_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_118A5E95_004A_FB5E_414F_25F73E14E9E4_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_118A5E95_004A_FB5E_414F_25F73E14E9E4_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_118A5E95_004A_FB5E_414F_25F73E14E9E4_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_118A5E95_004A_FB5E_414F_25F73E14E9E4_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "adjacentPanoramas": [
  {
   "yaw": -131.63,
   "panorama": "this.panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A",
   "backwardYaw": 117.73,
   "class": "AdjacentPanorama",
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 140
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": 160.03,
  "class": "PanoramaCameraPosition",
  "pitch": -6.28
 },
 "id": "panorama_11AC3D3D_004A_F94E_4142_D27F9A1181D7_camera"
},
{
 "label": "3bhk bedroom02 17th",
 "id": "panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_D0FEC682_C3F1_BB62_41D4_9102F3B6D6C5",
  "this.overlay_D09F0370_C3F0_99BE_41E4_9F144A073A5D",
  "this.overlay_20A85676_32A4_DC86_41C7_8BD7100CF053"
 ],
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "adjacentPanoramas": [
  {
   "yaw": 35.42,
   "panorama": "this.panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23",
   "backwardYaw": -64.1,
   "class": "AdjacentPanorama",
   "distance": 1
  },
  {
   "yaw": -115.31,
   "panorama": "this.panorama_0B55BDE4_0039_38FE_4139_E851DEBF7C58",
   "backwardYaw": -3.63,
   "class": "AdjacentPanorama",
   "distance": 1
  },
  {
   "yaw": -158.37,
   "panorama": "this.panorama_3E6FB4EF_32E5_BD87_4187_4E27487A5391",
   "backwardYaw": -125.23,
   "class": "AdjacentPanorama",
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": -145.26,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_83C99313_8CB4_B839_41E0_EF7CA675725E"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -76.34,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_80DDE0FD_8CB4_B9E9_4160_5F391BDB868B"
},
{
 "hfov": 360,
 "vfov": 180,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E50C840_32E4_74F9_41A4_4EC4173FA3A2_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_3E50C840_32E4_74F9_41A4_4EC4173FA3A2_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_3E50C840_32E4_74F9_41A4_4EC4173FA3A2_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_3E50C840_32E4_74F9_41A4_4EC4173FA3A2_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_3E50C840_32E4_74F9_41A4_4EC4173FA3A2_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_3E50C840_32E4_74F9_41A4_4EC4173FA3A2_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_3E50C840_32E4_74F9_41A4_4EC4173FA3A2_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_3E50C840_32E4_74F9_41A4_4EC4173FA3A2_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_3E50C840_32E4_74F9_41A4_4EC4173FA3A2_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_3E50C840_32E4_74F9_41A4_4EC4173FA3A2_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_3E50C840_32E4_74F9_41A4_4EC4173FA3A2_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_3E50C840_32E4_74F9_41A4_4EC4173FA3A2_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_3E50C840_32E4_74F9_41A4_4EC4173FA3A2_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_3E50C840_32E4_74F9_41A4_4EC4173FA3A2_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_3E50C840_32E4_74F9_41A4_4EC4173FA3A2_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_3E50C840_32E4_74F9_41A4_4EC4173FA3A2_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_3E50C840_32E4_74F9_41A4_4EC4173FA3A2_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "label": "3BHK_Bolcony_17",
 "id": "panorama_3E50C840_32E4_74F9_41A4_4EC4173FA3A2",
 "class": "Panorama",
 "adjacentPanoramas": [
  {
   "yaw": -161.4,
   "panorama": "this.panorama_3E6FB4EF_32E5_BD87_4187_4E27487A5391",
   "backwardYaw": -6.65,
   "class": "AdjacentPanorama",
   "distance": 1
  }
 ],
 "pitch": 0,
 "thumbnailUrl": "media/panorama_3E50C840_32E4_74F9_41A4_4EC4173FA3A2_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_2098B134_32A4_5499_41C2_22F48477A3BD"
 ],
 "hfovMax": 130
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": 159.21,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_80D6137C_8CB4_B8EE_41C8_B9B4B230719F"
},
{
 "label": "3bhk 02 entrance 17th floor",
 "id": "panorama_3E51A3EA_329B_DB8E_41B3_D516BBB498CC",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_3E51A3EA_329B_DB8E_41B3_D516BBB498CC_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_3C2492B0_32BC_759A_41B7_72D9BCA27205",
  "this.overlay_3DF1309D_32BD_B58A_41C4_D85A3ACB0676",
  "this.overlay_3D3AD041_32BF_F4FA_41C5_3331BDC2E822"
 ],
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E51A3EA_329B_DB8E_41B3_D516BBB498CC_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_3E51A3EA_329B_DB8E_41B3_D516BBB498CC_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_3E51A3EA_329B_DB8E_41B3_D516BBB498CC_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_3E51A3EA_329B_DB8E_41B3_D516BBB498CC_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_3E51A3EA_329B_DB8E_41B3_D516BBB498CC_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_3E51A3EA_329B_DB8E_41B3_D516BBB498CC_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_3E51A3EA_329B_DB8E_41B3_D516BBB498CC_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_3E51A3EA_329B_DB8E_41B3_D516BBB498CC_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_3E51A3EA_329B_DB8E_41B3_D516BBB498CC_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_3E51A3EA_329B_DB8E_41B3_D516BBB498CC_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_3E51A3EA_329B_DB8E_41B3_D516BBB498CC_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_3E51A3EA_329B_DB8E_41B3_D516BBB498CC_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_3E51A3EA_329B_DB8E_41B3_D516BBB498CC_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_3E51A3EA_329B_DB8E_41B3_D516BBB498CC_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_3E51A3EA_329B_DB8E_41B3_D516BBB498CC_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_3E51A3EA_329B_DB8E_41B3_D516BBB498CC_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_3E51A3EA_329B_DB8E_41B3_D516BBB498CC_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "adjacentPanoramas": [
  {
   "yaw": 127.04,
   "panorama": "this.panorama_3E6FB4EF_32E5_BD87_4187_4E27487A5391",
   "backwardYaw": 141.88,
   "class": "AdjacentPanorama",
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C857B562_C391_99A2_41D4_622CFBF52C0A"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_0DDD37F8_019B_0738_4165_2278D9DB7F90"
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": 123.13,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_800D9136_8CB4_B87B_41C2_B513666972AE"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": -91.93,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_81ACE16E_8CB4_B8EA_41C4_E68BB0DA55D7"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_3F79A584_32AC_5C7A_419D_E5B5EC2463D0_camera"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": -144.54,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_8071513E_8CB4_B86B_419A_8500E13ED289"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": 125.1,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_80657146_8CB4_B81B_4184_47A73CB581AD"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 128,
  "yaw": -144.58,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_82817226_8CB4_B81B_41B3_BCBD2E1943A8"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_3E181019_32A4_748A_41C7_D30403307065_camera"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": -145.55,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_8233F274_8CB4_B8FE_41AB_D70D97FCE8E7"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": 54.27,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_8127F1AE_8CB4_B86A_41B9_504585CBD36C"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": 54.52,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_81F03186_8CB4_B81A_41CD_43E78040F92B"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -45.72,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_83D95071_8CB4_B8F9_41DE_C8B7CC983057"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 135,
  "yaw": 49.25,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_80D1E384_8CB4_B81E_4195_FEE5BBFD9A5C"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 128,
  "yaw": -139.19,
  "class": "PanoramaCameraPosition",
  "pitch": -3.77
 },
 "id": "panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23_camera"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": -46.48,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_82BF71F7_8CB4_BBFA_41DC_6C21B6DEA978"
},
{
 "label": "Powder toilet 3BHK",
 "id": "panorama_0F2964AA_0199_39D8_415C_DAB75F704D09",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_0F2964AA_0199_39D8_415C_DAB75F704D09_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_12B3B3CD_01A9_1F58_4175_0448822DFE99"
 ],
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0F2964AA_0199_39D8_415C_DAB75F704D09_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_0F2964AA_0199_39D8_415C_DAB75F704D09_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0F2964AA_0199_39D8_415C_DAB75F704D09_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_0F2964AA_0199_39D8_415C_DAB75F704D09_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_0F2964AA_0199_39D8_415C_DAB75F704D09_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0F2964AA_0199_39D8_415C_DAB75F704D09_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_0F2964AA_0199_39D8_415C_DAB75F704D09_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_0F2964AA_0199_39D8_415C_DAB75F704D09_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0F2964AA_0199_39D8_415C_DAB75F704D09_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_0F2964AA_0199_39D8_415C_DAB75F704D09_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0F2964AA_0199_39D8_415C_DAB75F704D09_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_0F2964AA_0199_39D8_415C_DAB75F704D09_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_0F2964AA_0199_39D8_415C_DAB75F704D09_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0F2964AA_0199_39D8_415C_DAB75F704D09_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_0F2964AA_0199_39D8_415C_DAB75F704D09_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_0F2964AA_0199_39D8_415C_DAB75F704D09_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0F2964AA_0199_39D8_415C_DAB75F704D09_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "adjacentPanoramas": [
  {
   "yaw": 107.93,
   "panorama": "this.panorama_3E110129_32A4_548A_41A6_17FA339053A0",
   "backwardYaw": -55.99,
   "class": "AdjacentPanorama",
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 140
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": -173.29,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_80E0836B_8CB4_B8E9_41B9_F38AB7B47F52"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 128,
  "yaw": 21.63,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_81F1F43C_8CB4_B86F_41C2_4ED783E80D07"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 26.51,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 26.51,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 26.51,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": 22.73,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_80DB538B_8CB4_B82A_41E1_8DE0636E35C1"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": -46.22,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_80C18106_8CB4_B81A_41DD_A6140A6998F2"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": -142.45,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_800C83D6_8CB4_B83A_41D3_A8F057A1CD09"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": 130.04,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_82239284_8CB4_B81E_41D0_2DED2E537A12"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": 21.84,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_83B4D2C5_8CB4_B81E_41D2_2A349C3F89EE"
},
{
 "label": "3bhk_BDRoom03_toilet copy",
 "id": "panorama_0C72BAA0_0039_5B76_4145_C1EF94F793A0",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_0C72BAA0_0039_5B76_4145_C1EF94F793A0_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_117BAD49_0079_5936_4155_38DBB5BBB748"
 ],
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0C72BAA0_0039_5B76_4145_C1EF94F793A0_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_0C72BAA0_0039_5B76_4145_C1EF94F793A0_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0C72BAA0_0039_5B76_4145_C1EF94F793A0_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_0C72BAA0_0039_5B76_4145_C1EF94F793A0_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_0C72BAA0_0039_5B76_4145_C1EF94F793A0_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0C72BAA0_0039_5B76_4145_C1EF94F793A0_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_0C72BAA0_0039_5B76_4145_C1EF94F793A0_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_0C72BAA0_0039_5B76_4145_C1EF94F793A0_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0C72BAA0_0039_5B76_4145_C1EF94F793A0_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_0C72BAA0_0039_5B76_4145_C1EF94F793A0_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0C72BAA0_0039_5B76_4145_C1EF94F793A0_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_0C72BAA0_0039_5B76_4145_C1EF94F793A0_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_0C72BAA0_0039_5B76_4145_C1EF94F793A0_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0C72BAA0_0039_5B76_4145_C1EF94F793A0_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_0C72BAA0_0039_5B76_4145_C1EF94F793A0_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_0C72BAA0_0039_5B76_4145_C1EF94F793A0_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0C72BAA0_0039_5B76_4145_C1EF94F793A0_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "adjacentPanoramas": [
  {
   "yaw": 60.43,
   "panorama": "this.panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4",
   "backwardYaw": -93.55,
   "class": "AdjacentPanorama",
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 140
},
{
 "label": "3bhk bedroom03 02 23rd",
 "id": "panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_D25D23DA_C655_D841_41D7_0482A8407978",
  "this.overlay_141820D1_0608_DE13_4184_3BBBDEF95731"
 ],
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "adjacentPanoramas": [
  {
   "yaw": -54.9,
   "panorama": "this.panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7",
   "backwardYaw": 43.8,
   "class": "AdjacentPanorama",
   "distance": 1
  },
  {
   "yaw": -94.17,
   "panorama": "this.panorama_136FCF41_004A_D936_4151_FFADF2CFBA26",
   "backwardYaw": 61.56,
   "class": "AdjacentPanorama",
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 140
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": -53.84,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_82F19233_8CB4_B879_41B2_DD98B098CBFF"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 125,
  "yaw": 152.14,
  "class": "PanoramaCameraPosition",
  "pitch": -4.72
 },
 "id": "panorama_CF1013BA_C391_98A2_4167_0505D502E364_camera"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -144.54,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_83F43051_8CB4_B839_41D2_2DF156EAE79B"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": 55.53,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_80FA10E4_8CB4_B81F_41D0_01D5566D3458"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": 158.25,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_833B531D_8CB4_B82E_41D7_3D5A85C44BAF"
},
{
 "label": "3bhk Passage 33rd floor",
 "id": "panorama_3E24D2BF_32A4_D587_4192_FCC0A640BC00",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_3E24D2BF_32A4_D587_4192_FCC0A640BC00_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_1A0C0FA4_3365_ABB9_41C4_642D3FFA3681",
  "this.overlay_19595136_3364_B486_41B2_AB314BF8E1F9",
  "this.overlay_1A9011A8_3364_5789_41C4_B319C08CED6A"
 ],
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E24D2BF_32A4_D587_4192_FCC0A640BC00_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_3E24D2BF_32A4_D587_4192_FCC0A640BC00_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_3E24D2BF_32A4_D587_4192_FCC0A640BC00_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_3E24D2BF_32A4_D587_4192_FCC0A640BC00_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_3E24D2BF_32A4_D587_4192_FCC0A640BC00_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_3E24D2BF_32A4_D587_4192_FCC0A640BC00_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_3E24D2BF_32A4_D587_4192_FCC0A640BC00_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_3E24D2BF_32A4_D587_4192_FCC0A640BC00_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_3E24D2BF_32A4_D587_4192_FCC0A640BC00_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_3E24D2BF_32A4_D587_4192_FCC0A640BC00_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_3E24D2BF_32A4_D587_4192_FCC0A640BC00_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_3E24D2BF_32A4_D587_4192_FCC0A640BC00_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_3E24D2BF_32A4_D587_4192_FCC0A640BC00_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_3E24D2BF_32A4_D587_4192_FCC0A640BC00_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_3E24D2BF_32A4_D587_4192_FCC0A640BC00_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_3E24D2BF_32A4_D587_4192_FCC0A640BC00_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_3E24D2BF_32A4_D587_4192_FCC0A640BC00_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "adjacentPanoramas": [
  {
   "yaw": -3.22,
   "panorama": "this.panorama_3E110129_32A4_548A_41A6_17FA339053A0",
   "backwardYaw": 6.33,
   "class": "AdjacentPanorama",
   "distance": 1
  },
  {
   "yaw": 34.45,
   "panorama": "this.panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0",
   "backwardYaw": 152.97,
   "class": "AdjacentPanorama",
   "distance": 1
  },
  {
   "yaw": -81.35,
   "panorama": "this.panorama_E609D5D6_C65C_5841_41DC_4408506ECD34",
   "backwardYaw": 6.37,
   "class": "AdjacentPanorama",
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 140
},
{
 "label": "3bhk_bedroom01_toilet copy",
 "id": "panorama_118D55D0_004A_E8D6_412B_F15016B43EC0",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_118D55D0_004A_E8D6_412B_F15016B43EC0_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_1AF1323F_0049_6B4A_4158_18971B8C0B2E"
 ],
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_118D55D0_004A_E8D6_412B_F15016B43EC0_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_118D55D0_004A_E8D6_412B_F15016B43EC0_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_118D55D0_004A_E8D6_412B_F15016B43EC0_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_118D55D0_004A_E8D6_412B_F15016B43EC0_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_118D55D0_004A_E8D6_412B_F15016B43EC0_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_118D55D0_004A_E8D6_412B_F15016B43EC0_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_118D55D0_004A_E8D6_412B_F15016B43EC0_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_118D55D0_004A_E8D6_412B_F15016B43EC0_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_118D55D0_004A_E8D6_412B_F15016B43EC0_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_118D55D0_004A_E8D6_412B_F15016B43EC0_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_118D55D0_004A_E8D6_412B_F15016B43EC0_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_118D55D0_004A_E8D6_412B_F15016B43EC0_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_118D55D0_004A_E8D6_412B_F15016B43EC0_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_118D55D0_004A_E8D6_412B_F15016B43EC0_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_118D55D0_004A_E8D6_412B_F15016B43EC0_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_118D55D0_004A_E8D6_412B_F15016B43EC0_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_118D55D0_004A_E8D6_412B_F15016B43EC0_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "adjacentPanoramas": [
  {
   "yaw": -3.63,
   "panorama": "this.panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068",
   "backwardYaw": -115.94,
   "class": "AdjacentPanorama",
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 140
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 128,
  "yaw": 115.9,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_803B2117_8CB4_B839_41D7_5F9B11D083FA"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": -136.54,
  "class": "PanoramaCameraPosition",
  "pitch": -4.05
 },
 "id": "panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2_camera"
},
{
 "label": "3bhk kitchen",
 "id": "panorama_E609D5D6_C65C_5841_41DC_4408506ECD34",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_E609D5D6_C65C_5841_41DC_4408506ECD34_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_E2FE88E0_C64D_C841_41C3_2E195A899599"
 ],
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E609D5D6_C65C_5841_41DC_4408506ECD34_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_E609D5D6_C65C_5841_41DC_4408506ECD34_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_E609D5D6_C65C_5841_41DC_4408506ECD34_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_E609D5D6_C65C_5841_41DC_4408506ECD34_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_E609D5D6_C65C_5841_41DC_4408506ECD34_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_E609D5D6_C65C_5841_41DC_4408506ECD34_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_E609D5D6_C65C_5841_41DC_4408506ECD34_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_E609D5D6_C65C_5841_41DC_4408506ECD34_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_E609D5D6_C65C_5841_41DC_4408506ECD34_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_E609D5D6_C65C_5841_41DC_4408506ECD34_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_E609D5D6_C65C_5841_41DC_4408506ECD34_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_E609D5D6_C65C_5841_41DC_4408506ECD34_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_E609D5D6_C65C_5841_41DC_4408506ECD34_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "adjacentPanoramas": [
  {
   "yaw": 6.37,
   "panorama": "this.panorama_3E24D2BF_32A4_D587_4192_FCC0A640BC00",
   "backwardYaw": -81.35,
   "class": "AdjacentPanorama",
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 140
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": -91.18,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_83C9F07A_8CB4_B8EB_41B3_B3946C9F7772"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": -140.53,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_82AEB205_8CB4_B81E_41D0_D9A1A2C93F1F"
},
{
 "label": "3bhk_bedroom01_toilet copy",
 "id": "panorama_118B7384_0049_E93E_4136_7E71C475A6E0",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_118B7384_0049_E93E_4136_7E71C475A6E0_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_17D9B17A_0059_69CA_412E_7A0DA76B62F0"
 ],
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_118B7384_0049_E93E_4136_7E71C475A6E0_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_118B7384_0049_E93E_4136_7E71C475A6E0_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_118B7384_0049_E93E_4136_7E71C475A6E0_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_118B7384_0049_E93E_4136_7E71C475A6E0_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_118B7384_0049_E93E_4136_7E71C475A6E0_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_118B7384_0049_E93E_4136_7E71C475A6E0_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_118B7384_0049_E93E_4136_7E71C475A6E0_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_118B7384_0049_E93E_4136_7E71C475A6E0_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_118B7384_0049_E93E_4136_7E71C475A6E0_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_118B7384_0049_E93E_4136_7E71C475A6E0_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_118B7384_0049_E93E_4136_7E71C475A6E0_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_118B7384_0049_E93E_4136_7E71C475A6E0_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_118B7384_0049_E93E_4136_7E71C475A6E0_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_118B7384_0049_E93E_4136_7E71C475A6E0_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_118B7384_0049_E93E_4136_7E71C475A6E0_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_118B7384_0049_E93E_4136_7E71C475A6E0_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_118B7384_0049_E93E_4136_7E71C475A6E0_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A"
  }
 ],
 "vfov": 180,
 "hfovMax": 140
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": -173.67,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_81D2C196_8CB4_B83A_41D8_C3B526E6DCD3"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": 130.25,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_819FA175_8CB4_B8F9_41D7_AA9A27CCB522"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": 64.06,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_8006312E_8CB4_B86B_41DD_5646D8ED00A8"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_3E6FB4EF_32E5_BD87_4187_4E27487A5391_camera"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_3E24D2BF_32A4_D587_4192_FCC0A640BC00_camera"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_3FF204B8_32AD_FD8A_41C8_A348279F77D9_camera"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": -120.08,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_83D9C30A_8CB4_B82B_41D6_E23F2D92E5F1"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": -54.22,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_80C4B393_8CB4_B83A_41C7_D42E89E8F457"
},
{
 "hfov": 360,
 "vfov": 180,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0B65F72F_0039_294A_413D_7167CFDDAD60_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_0B65F72F_0039_294A_413D_7167CFDDAD60_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0B65F72F_0039_294A_413D_7167CFDDAD60_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_0B65F72F_0039_294A_413D_7167CFDDAD60_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_0B65F72F_0039_294A_413D_7167CFDDAD60_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0B65F72F_0039_294A_413D_7167CFDDAD60_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_0B65F72F_0039_294A_413D_7167CFDDAD60_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_0B65F72F_0039_294A_413D_7167CFDDAD60_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0B65F72F_0039_294A_413D_7167CFDDAD60_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_0B65F72F_0039_294A_413D_7167CFDDAD60_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0B65F72F_0039_294A_413D_7167CFDDAD60_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_0B65F72F_0039_294A_413D_7167CFDDAD60_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_0B65F72F_0039_294A_413D_7167CFDDAD60_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0B65F72F_0039_294A_413D_7167CFDDAD60_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_0B65F72F_0039_294A_413D_7167CFDDAD60_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_0B65F72F_0039_294A_413D_7167CFDDAD60_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0B65F72F_0039_294A_413D_7167CFDDAD60_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "label": "3bhk_bed2_toilet copy",
 "id": "panorama_0B65F72F_0039_294A_413D_7167CFDDAD60",
 "class": "Panorama",
 "adjacentPanoramas": [
  {
   "yaw": -130.12,
   "panorama": "this.panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40",
   "backwardYaw": 119.11,
   "class": "AdjacentPanorama",
   "distance": 1
  }
 ],
 "pitch": 0,
 "thumbnailUrl": "media/panorama_0B65F72F_0039_294A_413D_7167CFDDAD60_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_1357338D_0077_294E_4147_F9D08C457157"
 ],
 "hfovMax": 130
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": 85.83,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_8095B0BB_8CB4_B86A_41E0_CEA0F566D6CD"
},
{
 "label": "3bhk kitchen",
 "id": "panorama_CF1013BA_C391_98A2_4167_0505D502E364",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_CF1013BA_C391_98A2_4167_0505D502E364_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_D178C03E_C3F0_B7A5_41CB_0834EED7746E"
 ],
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CF1013BA_C391_98A2_4167_0505D502E364_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CF1013BA_C391_98A2_4167_0505D502E364_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CF1013BA_C391_98A2_4167_0505D502E364_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CF1013BA_C391_98A2_4167_0505D502E364_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CF1013BA_C391_98A2_4167_0505D502E364_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CF1013BA_C391_98A2_4167_0505D502E364_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CF1013BA_C391_98A2_4167_0505D502E364_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CF1013BA_C391_98A2_4167_0505D502E364_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CF1013BA_C391_98A2_4167_0505D502E364_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CF1013BA_C391_98A2_4167_0505D502E364_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CF1013BA_C391_98A2_4167_0505D502E364_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CF1013BA_C391_98A2_4167_0505D502E364_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CF1013BA_C391_98A2_4167_0505D502E364_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "adjacentPanoramas": [
  {
   "yaw": 4.72,
   "panorama": "this.panorama_C857B562_C391_99A2_41D4_622CFBF52C0A",
   "backwardYaw": -82.58,
   "class": "AdjacentPanorama",
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": 175.86,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_81B9D415_8CB4_B83E_41E0_3204E1746F3E"
},
{
 "hfov": 360,
 "vfov": 180,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E6FB4EF_32E5_BD87_4187_4E27487A5391_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_3E6FB4EF_32E5_BD87_4187_4E27487A5391_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_3E6FB4EF_32E5_BD87_4187_4E27487A5391_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_3E6FB4EF_32E5_BD87_4187_4E27487A5391_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_3E6FB4EF_32E5_BD87_4187_4E27487A5391_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_3E6FB4EF_32E5_BD87_4187_4E27487A5391_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_3E6FB4EF_32E5_BD87_4187_4E27487A5391_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_3E6FB4EF_32E5_BD87_4187_4E27487A5391_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_3E6FB4EF_32E5_BD87_4187_4E27487A5391_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_3E6FB4EF_32E5_BD87_4187_4E27487A5391_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_3E6FB4EF_32E5_BD87_4187_4E27487A5391_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_3E6FB4EF_32E5_BD87_4187_4E27487A5391_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_3E6FB4EF_32E5_BD87_4187_4E27487A5391_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_3E6FB4EF_32E5_BD87_4187_4E27487A5391_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_3E6FB4EF_32E5_BD87_4187_4E27487A5391_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_3E6FB4EF_32E5_BD87_4187_4E27487A5391_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_3E6FB4EF_32E5_BD87_4187_4E27487A5391_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "label": "3bhk 01 hall 17th floor",
 "id": "panorama_3E6FB4EF_32E5_BD87_4187_4E27487A5391",
 "class": "Panorama",
 "adjacentPanoramas": [
  {
   "yaw": 134.28,
   "panorama": "this.panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9",
   "backwardYaw": -146.66,
   "class": "AdjacentPanorama",
   "distance": 1
  },
  {
   "yaw": 141.88,
   "panorama": "this.panorama_3E51A3EA_329B_DB8E_41B3_D516BBB498CC",
   "backwardYaw": 127.04,
   "class": "AdjacentPanorama",
   "distance": 1
  },
  {
   "yaw": -6.65,
   "panorama": "this.panorama_3E50C840_32E4_74F9_41A4_4EC4173FA3A2",
   "backwardYaw": -161.4,
   "class": "AdjacentPanorama",
   "distance": 1
  },
  {
   "yaw": -125.23,
   "panorama": "this.panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5",
   "backwardYaw": -158.37,
   "class": "AdjacentPanorama",
   "distance": 1
  }
 ],
 "pitch": 0,
 "thumbnailUrl": "media/panorama_3E6FB4EF_32E5_BD87_4187_4E27487A5391_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_3D7349BD_32BC_778A_4180_C573C2C75FFB",
  "this.overlay_233B548B_32BC_5D8E_41C7_F55DAF5829C6",
  "this.overlay_20FA1B8A_32BD_AB8E_41C8_0F7543612339",
  "this.overlay_23D0DBA5_32BC_EBBA_41C1_E474DF25AAC3"
 ],
 "hfovMax": 130
},
{
 "label": "3bhk 01 hall 28th floor",
 "id": "panorama_3FF204B8_32AD_FD8A_41C8_A348279F77D9",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_3FF204B8_32AD_FD8A_41C8_A348279F77D9_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_281CFD8B_336C_EF8E_41BA_4EEEC4633EEB",
  "this.overlay_28913488_336F_DD8A_41A6_A79938E14234",
  "this.overlay_2F1676EF_336C_5D86_41B8_D7D223FBE696",
  "this.overlay_2F94ADDA_336C_6F89_41B3_E166F691B2DD"
 ],
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FF204B8_32AD_FD8A_41C8_A348279F77D9_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_3FF204B8_32AD_FD8A_41C8_A348279F77D9_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_3FF204B8_32AD_FD8A_41C8_A348279F77D9_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_3FF204B8_32AD_FD8A_41C8_A348279F77D9_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_3FF204B8_32AD_FD8A_41C8_A348279F77D9_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_3FF204B8_32AD_FD8A_41C8_A348279F77D9_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_3FF204B8_32AD_FD8A_41C8_A348279F77D9_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_3FF204B8_32AD_FD8A_41C8_A348279F77D9_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_3FF204B8_32AD_FD8A_41C8_A348279F77D9_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_3FF204B8_32AD_FD8A_41C8_A348279F77D9_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_3FF204B8_32AD_FD8A_41C8_A348279F77D9_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_3FF204B8_32AD_FD8A_41C8_A348279F77D9_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_3FF204B8_32AD_FD8A_41C8_A348279F77D9_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_3FF204B8_32AD_FD8A_41C8_A348279F77D9_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_3FF204B8_32AD_FD8A_41C8_A348279F77D9_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_3FF204B8_32AD_FD8A_41C8_A348279F77D9_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_3FF204B8_32AD_FD8A_41C8_A348279F77D9_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "adjacentPanoramas": [
  {
   "yaw": -4.14,
   "panorama": "this.panorama_3CDB8152_32AC_549E_41C0_2EA6C9801032",
   "backwardYaw": -170.07,
   "class": "AdjacentPanorama",
   "distance": 1
  },
  {
   "yaw": 135.28,
   "panorama": "this.panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0",
   "backwardYaw": -148.21,
   "class": "AdjacentPanorama",
   "distance": 1
  },
  {
   "yaw": -125.48,
   "panorama": "this.panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A",
   "backwardYaw": -158.16,
   "class": "AdjacentPanorama",
   "distance": 1
  },
  {
   "yaw": 148.66,
   "panorama": "this.panorama_3FE2707B_32AC_B48E_41C6_A7FCAE50A2B6",
   "backwardYaw": 127.04,
   "class": "AdjacentPanorama",
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 140
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": 123.89,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_8099F0CC_8CB4_B82F_41C3_45FEDA430A97"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D_camera"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 135,
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_0E9BEAA3_0199_09C8_416E_D3D5D37321FD_camera"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": 34.68,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_82C0B264_8CB4_B81E_41B9_4861888E9A6A"
},
{
 "label": "3bhk bedroom02 1 28th",
 "id": "panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_DFA742CC_C674_3841_419D_AB7849550207",
  "this.overlay_14AA83F7_0608_A21E_4189_B52BDB95135B"
 ],
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "adjacentPanoramas": [
  {
   "yaw": 88.07,
   "panorama": "this.panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0",
   "backwardYaw": -21.75,
   "class": "AdjacentPanorama",
   "distance": 1
  },
  {
   "yaw": 117.1,
   "panorama": "this.panorama_11906CBC_0049_DF4E_411B_4127E5D5F480",
   "backwardYaw": -131.63,
   "class": "AdjacentPanorama",
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 140
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": 154.25,
  "class": "PanoramaCameraPosition",
  "pitch": -2.26
 },
 "id": "panorama_135DA583_0049_293A_414E_3C25985D46CB_camera"
},
{
 "label": "3bhk bedroom02 33rd",
 "id": "panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_E6C34BC9_C65D_C843_41E3_37D707F31C56",
  "this.overlay_E7577260_C65C_7843_41E0_F5DDAEA8A5BD",
  "this.overlay_18DE8DB9_336C_6F8A_41BD_1994DC6F4A21"
 ],
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "adjacentPanoramas": [
  {
   "yaw": -157.54,
   "panorama": "this.panorama_3E3FB1E6_32A7_D786_41C1_CD16D7C1F309",
   "backwardYaw": -125.73,
   "class": "AdjacentPanorama",
   "distance": 1
  },
  {
   "yaw": 37.55,
   "panorama": "this.panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D",
   "backwardYaw": -68.97,
   "class": "AdjacentPanorama",
   "distance": 1
  },
  {
   "yaw": -115.94,
   "panorama": "this.panorama_118D55D0_004A_E8D6_412B_F15016B43EC0",
   "backwardYaw": -3.63,
   "class": "AdjacentPanorama",
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 140
},
{
 "label": "3bhk bedroom01 23rd",
 "id": "panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_D4424B68_C654_C841_41AA_04E4BDB57422"
 ],
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "adjacentPanoramas": [
  {
   "yaw": -61.42,
   "panorama": "this.panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590",
   "backwardYaw": 33.02,
   "class": "AdjacentPanorama",
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 140
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_camera"
},
{
 "label": "3bhk bedroom03 01 106th",
 "id": "panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_E54E0653_C654_5847_41E2_4F2F79E153AD",
  "this.overlay_E5F8F5BF_C654_583F_41E0_5A5263ACE886"
 ],
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "adjacentPanoramas": [
  {
   "yaw": 152.97,
   "panorama": "this.panorama_3E24D2BF_32A4_D587_4192_FCC0A640BC00",
   "backwardYaw": 34.45,
   "class": "AdjacentPanorama",
   "distance": 1
  },
  {
   "yaw": 37.62,
   "panorama": "this.panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA",
   "backwardYaw": -49.96,
   "class": "AdjacentPanorama",
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 140
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": 10.18,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_82D0E255_8CB4_B839_41D7_37D3AC8E95D2"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": 152.92,
  "class": "PanoramaCameraPosition",
  "pitch": -1.65
 },
 "id": "panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA_camera"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_3E7EC44F_32AB_DC87_41C2_5748F1C76A53_camera"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": -142.38,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_83A1A033_8CB4_B879_41E0_42726FAD54AC"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": -31.34,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_8056E14F_8CB4_B82A_418A_771F066A2220"
},
{
 "label": "3bhk_bed2_toilet copy",
 "id": "panorama_11906CBC_0049_DF4E_411B_4127E5D5F480",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_11906CBC_0049_DF4E_411B_4127E5D5F480_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_18E3C57F_0057_29CA_4147_F4600E232D3B"
 ],
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_11906CBC_0049_DF4E_411B_4127E5D5F480_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_11906CBC_0049_DF4E_411B_4127E5D5F480_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_11906CBC_0049_DF4E_411B_4127E5D5F480_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_11906CBC_0049_DF4E_411B_4127E5D5F480_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_11906CBC_0049_DF4E_411B_4127E5D5F480_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_11906CBC_0049_DF4E_411B_4127E5D5F480_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_11906CBC_0049_DF4E_411B_4127E5D5F480_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_11906CBC_0049_DF4E_411B_4127E5D5F480_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_11906CBC_0049_DF4E_411B_4127E5D5F480_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_11906CBC_0049_DF4E_411B_4127E5D5F480_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_11906CBC_0049_DF4E_411B_4127E5D5F480_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_11906CBC_0049_DF4E_411B_4127E5D5F480_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_11906CBC_0049_DF4E_411B_4127E5D5F480_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_11906CBC_0049_DF4E_411B_4127E5D5F480_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_11906CBC_0049_DF4E_411B_4127E5D5F480_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_11906CBC_0049_DF4E_411B_4127E5D5F480_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_11906CBC_0049_DF4E_411B_4127E5D5F480_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "adjacentPanoramas": [
  {
   "yaw": -131.63,
   "panorama": "this.panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5",
   "backwardYaw": 117.1,
   "class": "AdjacentPanorama",
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 140
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_0DDD37F8_019B_0738_4165_2278D9DB7F90_camera"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 26.51,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 26.51,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 26.51,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9_camera"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": -137.41,
  "class": "PanoramaCameraPosition",
  "pitch": -3.72
 },
 "id": "panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D_camera"
},
{
 "label": "3bhk bedroom03 02 28th",
 "id": "panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_DDE3106F_C64C_D85F_41C3_782CF613010E",
  "this.overlay_15CEF500_0608_67F2_415C_6AB7E6A6DB80"
 ],
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "adjacentPanoramas": [
  {
   "yaw": -93.92,
   "panorama": "this.panorama_135DA583_0049_293A_414E_3C25985D46CB",
   "backwardYaw": 59.92,
   "class": "AdjacentPanorama",
   "distance": 1
  },
  {
   "yaw": -49.75,
   "panorama": "this.panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B",
   "backwardYaw": 34.74,
   "class": "AdjacentPanorama",
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 140
},
{
 "label": "3bhk_BDRoom03_toilet copy",
 "id": "panorama_135DA583_0049_293A_414E_3C25985D46CB",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_135DA583_0049_293A_414E_3C25985D46CB_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_19FC6A44_0049_7B3E_4152_6EC2AFFF8366"
 ],
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_135DA583_0049_293A_414E_3C25985D46CB_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_135DA583_0049_293A_414E_3C25985D46CB_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_135DA583_0049_293A_414E_3C25985D46CB_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_135DA583_0049_293A_414E_3C25985D46CB_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_135DA583_0049_293A_414E_3C25985D46CB_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_135DA583_0049_293A_414E_3C25985D46CB_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_135DA583_0049_293A_414E_3C25985D46CB_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_135DA583_0049_293A_414E_3C25985D46CB_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_135DA583_0049_293A_414E_3C25985D46CB_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_135DA583_0049_293A_414E_3C25985D46CB_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_135DA583_0049_293A_414E_3C25985D46CB_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_135DA583_0049_293A_414E_3C25985D46CB_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_135DA583_0049_293A_414E_3C25985D46CB_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_135DA583_0049_293A_414E_3C25985D46CB_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_135DA583_0049_293A_414E_3C25985D46CB_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_135DA583_0049_293A_414E_3C25985D46CB_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_135DA583_0049_293A_414E_3C25985D46CB_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "adjacentPanoramas": [
  {
   "yaw": 59.92,
   "panorama": "this.panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6",
   "backwardYaw": -93.92,
   "class": "AdjacentPanorama",
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 140
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": 114.32,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_81E0E18E_8CB4_B82A_41C6_7CC9CB2560D2"
},
{
 "items": [
  {
   "media": "this.panorama_3E51A3EA_329B_DB8E_41B3_D516BBB498CC",
   "camera": "this.panorama_3E51A3EA_329B_DB8E_41B3_D516BBB498CC_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_3E6FB4EF_32E5_BD87_4187_4E27487A5391",
   "camera": "this.panorama_3E6FB4EF_32E5_BD87_4187_4E27487A5391_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_3E50C840_32E4_74F9_41A4_4EC4173FA3A2",
   "camera": "this.panorama_3E50C840_32E4_74F9_41A4_4EC4173FA3A2_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_0DDD37F8_019B_0738_4165_2278D9DB7F90",
   "camera": "this.panorama_0DDD37F8_019B_0738_4165_2278D9DB7F90_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_C857B562_C391_99A2_41D4_622CFBF52C0A",
   "camera": "this.panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_CF1013BA_C391_98A2_4167_0505D502E364",
   "camera": "this.panorama_CF1013BA_C391_98A2_4167_0505D502E364_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5",
   "camera": "this.panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 6, 7)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23",
   "camera": "this.panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 7, 8)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_0B55BDE4_0039_38FE_4139_E851DEBF7C58",
   "camera": "this.panorama_0B55BDE4_0039_38FE_4139_E851DEBF7C58_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 8, 9)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9",
   "camera": "this.panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 9, 10)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40",
   "camera": "this.panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 10, 11)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_0B65F72F_0039_294A_413D_7167CFDDAD60",
   "camera": "this.panorama_0B65F72F_0039_294A_413D_7167CFDDAD60_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 11, 12)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A",
   "camera": "this.panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 12, 13)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4",
   "camera": "this.panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 13, 14)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_0C72BAA0_0039_5B76_4145_C1EF94F793A0",
   "camera": "this.panorama_0C72BAA0_0039_5B76_4145_C1EF94F793A0_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 14, 15)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_3F570BCA_32AC_AB8E_418D_9A4B6CEEBAEF",
   "camera": "this.panorama_3F570BCA_32AC_AB8E_418D_9A4B6CEEBAEF_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 15, 16)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_3F79A584_32AC_5C7A_419D_E5B5EC2463D0",
   "camera": "this.panorama_3F79A584_32AC_5C7A_419D_E5B5EC2463D0_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 16, 17)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_3E62E564_32A4_DCB9_41BD_32CA02213B87",
   "camera": "this.panorama_3E62E564_32A4_DCB9_41BD_32CA02213B87_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 17, 18)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_0EF390FE_019F_1938_4173_7E5BC178F7F6",
   "camera": "this.panorama_0EF390FE_019F_1938_4173_7E5BC178F7F6_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 18, 19)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_3E7EC44F_32AB_DC87_41C2_5748F1C76A53",
   "camera": "this.panorama_3E7EC44F_32AB_DC87_41C2_5748F1C76A53_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 19, 20)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA",
   "camera": "this.panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 20, 21)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590",
   "camera": "this.panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 21, 22)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2",
   "camera": "this.panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 22, 23)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_11AC3D3D_004A_F94E_4142_D27F9A1181D7",
   "camera": "this.panorama_11AC3D3D_004A_F94E_4142_D27F9A1181D7_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 23, 24)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5",
   "camera": "this.panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 24, 25)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9",
   "camera": "this.panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 25, 26)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_11B27642_004A_EB3A_4142_7CBC8EFC0A22",
   "camera": "this.panorama_11B27642_004A_EB3A_4142_7CBC8EFC0A22_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 26, 27)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7",
   "camera": "this.panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 27, 28)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D",
   "camera": "this.panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 28, 29)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_136FCF41_004A_D936_4151_FFADF2CFBA26",
   "camera": "this.panorama_136FCF41_004A_D936_4151_FFADF2CFBA26_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 29, 30)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_3FE2707B_32AC_B48E_41C6_A7FCAE50A2B6",
   "camera": "this.panorama_3FE2707B_32AC_B48E_41C6_A7FCAE50A2B6_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 30, 31)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_3FF204B8_32AD_FD8A_41C8_A348279F77D9",
   "camera": "this.panorama_3FF204B8_32AD_FD8A_41C8_A348279F77D9_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 31, 32)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_3CDB8152_32AC_549E_41C0_2EA6C9801032",
   "camera": "this.panorama_3CDB8152_32AC_549E_41C0_2EA6C9801032_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 32, 33)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_0E9BEAA3_0199_09C8_416E_D3D5D37321FD",
   "camera": "this.panorama_0E9BEAA3_0199_09C8_416E_D3D5D37321FD_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 33, 34)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_3E3ACD8A_32AC_AF89_41C5_288091B6AF29",
   "camera": "this.panorama_3E3ACD8A_32AC_AF89_41C5_288091B6AF29_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 34, 35)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9",
   "camera": "this.panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 35, 36)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A",
   "camera": "this.panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 36, 37)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5",
   "camera": "this.panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 37, 38)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_118B7384_0049_E93E_4136_7E71C475A6E0",
   "camera": "this.panorama_118B7384_0049_E93E_4136_7E71C475A6E0_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 38, 39)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0",
   "camera": "this.panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 39, 40)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5",
   "camera": "this.panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 40, 41)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_11906CBC_0049_DF4E_411B_4127E5D5F480",
   "camera": "this.panorama_11906CBC_0049_DF4E_411B_4127E5D5F480_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 41, 42)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B",
   "camera": "this.panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 42, 43)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6",
   "camera": "this.panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 43, 44)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_135DA583_0049_293A_414E_3C25985D46CB",
   "camera": "this.panorama_135DA583_0049_293A_414E_3C25985D46CB_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 44, 45)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_3E110129_32A4_548A_41A6_17FA339053A0",
   "camera": "this.panorama_3E110129_32A4_548A_41A6_17FA339053A0_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 45, 46)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_3E3FB1E6_32A7_D786_41C1_CD16D7C1F309",
   "camera": "this.panorama_3E3FB1E6_32A7_D786_41C1_CD16D7C1F309_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 46, 47)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_3E181019_32A4_748A_41C7_D30403307065",
   "camera": "this.panorama_3E181019_32A4_748A_41C7_D30403307065_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 47, 48)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_0F2964AA_0199_39D8_415C_DAB75F704D09",
   "camera": "this.panorama_0F2964AA_0199_39D8_415C_DAB75F704D09_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 48, 49)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_3E24D2BF_32A4_D587_4192_FCC0A640BC00",
   "camera": "this.panorama_3E24D2BF_32A4_D587_4192_FCC0A640BC00_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 49, 50)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_E609D5D6_C65C_5841_41DC_4408506ECD34",
   "camera": "this.panorama_E609D5D6_C65C_5841_41DC_4408506ECD34_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 50, 51)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068",
   "camera": "this.panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 51, 52)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D",
   "camera": "this.panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 52, 53)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_118D55D0_004A_E8D6_412B_F15016B43EC0",
   "camera": "this.panorama_118D55D0_004A_E8D6_412B_F15016B43EC0_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 53, 54)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A",
   "camera": "this.panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 54, 55)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A",
   "camera": "this.panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 55, 56)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_118A5E95_004A_FB5E_414F_25F73E14E9E4",
   "camera": "this.panorama_118A5E95_004A_FB5E_414F_25F73E14E9E4_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 56, 57)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0",
   "camera": "this.panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 57, 58)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA",
   "camera": "this.panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 58, 59)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_12B1E6F5_004A_E8DE_4153_B75256AABCDC",
   "end": "this.trigger('tourEnded')",
   "camera": "this.panorama_12B1E6F5_004A_E8DE_4153_B75256AABCDC_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 59, 0)",
   "player": "this.MainViewerPanoramaPlayer"
  }
 ],
 "id": "mainPlayList",
 "class": "PlayList"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_3E62E564_32A4_DCB9_41BD_32CA02213B87_camera"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 49.88,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_815C21DD_8CB4_B829_41E1_54E67F0C5EE3"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": 22.46,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_82E15241_8CB4_B819_41B1_5FE9F086FD9A"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": -44.72,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_81BAF166_8CB4_B81A_41B9_94F6029CD6E4"
},
{
 "label": "3bhk bedroom01 28th",
 "id": "panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_DEEEAE21_C674_CBC3_41DF_981A8131049C"
 ],
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "adjacentPanoramas": [
  {
   "yaw": -65.68,
   "panorama": "this.panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A",
   "backwardYaw": 39.47,
   "class": "AdjacentPanorama",
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 140
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 135,
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_118B7384_0049_E93E_4136_7E71C475A6E0_camera"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": 9.93,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_8255B2B3_8CB4_B87A_41E0_01927A9FFFFD"
},
{
 "label": "3bhk 01 hall 33rd floor",
 "id": "panorama_3E3FB1E6_32A7_D786_41C1_CD16D7C1F309",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_3E3FB1E6_32A7_D786_41C1_CD16D7C1F309_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_171BF5A2_337C_5FBE_41C1_1CFC8A15F9B7",
  "this.overlay_1612DDE0_337D_AFBA_41AB_8C2FFC9AF43D",
  "this.overlay_16441BF7_3364_6B86_41C2_FCE0607B865B",
  "this.overlay_16AA1020_3364_D4BA_41BC_B44D16D56E0B"
 ],
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E3FB1E6_32A7_D786_41C1_CD16D7C1F309_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_3E3FB1E6_32A7_D786_41C1_CD16D7C1F309_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_3E3FB1E6_32A7_D786_41C1_CD16D7C1F309_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_3E3FB1E6_32A7_D786_41C1_CD16D7C1F309_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_3E3FB1E6_32A7_D786_41C1_CD16D7C1F309_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_3E3FB1E6_32A7_D786_41C1_CD16D7C1F309_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_3E3FB1E6_32A7_D786_41C1_CD16D7C1F309_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_3E3FB1E6_32A7_D786_41C1_CD16D7C1F309_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_3E3FB1E6_32A7_D786_41C1_CD16D7C1F309_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_3E3FB1E6_32A7_D786_41C1_CD16D7C1F309_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_3E3FB1E6_32A7_D786_41C1_CD16D7C1F309_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_3E3FB1E6_32A7_D786_41C1_CD16D7C1F309_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_3E3FB1E6_32A7_D786_41C1_CD16D7C1F309_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_3E3FB1E6_32A7_D786_41C1_CD16D7C1F309_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_3E3FB1E6_32A7_D786_41C1_CD16D7C1F309_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_3E3FB1E6_32A7_D786_41C1_CD16D7C1F309_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_3E3FB1E6_32A7_D786_41C1_CD16D7C1F309_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "adjacentPanoramas": [
  {
   "yaw": 155.44,
   "panorama": "this.panorama_3E110129_32A4_548A_41A6_17FA339053A0",
   "backwardYaw": 126.16,
   "class": "AdjacentPanorama",
   "distance": 1
  },
  {
   "yaw": -125.73,
   "panorama": "this.panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068",
   "backwardYaw": -157.54,
   "class": "AdjacentPanorama",
   "distance": 1
  },
  {
   "yaw": -4.64,
   "panorama": "this.panorama_3E181019_32A4_748A_41C7_D30403307065",
   "backwardYaw": -169.82,
   "class": "AdjacentPanorama",
   "distance": 1
  },
  {
   "yaw": 133.52,
   "panorama": "this.panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A",
   "backwardYaw": -145.32,
   "class": "AdjacentPanorama",
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 140
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": -174.18,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_8387F2E3_8CB4_B819_41A1_D5663CDE7487"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_3E50C840_32E4_74F9_41A4_4EC4173FA3A2_camera"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_camera"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": -174.68,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_8397D2D9_8CB4_B829_41D0_1739A40B7411"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": 174.48,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_80F720DC_8CB4_B82F_41DF_766B5CAB1A0A"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 135,
  "yaw": 163.8,
  "class": "PanoramaCameraPosition",
  "pitch": -3.52
 },
 "id": "panorama_136FCF41_004A_D936_4151_FFADF2CFBA26_camera"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_0F2964AA_0199_39D8_415C_DAB75F704D09_camera"
},
{
 "label": "3bhk_bed2_toilet copy",
 "id": "panorama_11B27642_004A_EB3A_4142_7CBC8EFC0A22",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_11B27642_004A_EB3A_4142_7CBC8EFC0A22_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_1419C47C_0059_EFCE_4151_9254754CC460"
 ],
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_11B27642_004A_EB3A_4142_7CBC8EFC0A22_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_11B27642_004A_EB3A_4142_7CBC8EFC0A22_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_11B27642_004A_EB3A_4142_7CBC8EFC0A22_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_11B27642_004A_EB3A_4142_7CBC8EFC0A22_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_11B27642_004A_EB3A_4142_7CBC8EFC0A22_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_11B27642_004A_EB3A_4142_7CBC8EFC0A22_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_11B27642_004A_EB3A_4142_7CBC8EFC0A22_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_11B27642_004A_EB3A_4142_7CBC8EFC0A22_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_11B27642_004A_EB3A_4142_7CBC8EFC0A22_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_11B27642_004A_EB3A_4142_7CBC8EFC0A22_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_11B27642_004A_EB3A_4142_7CBC8EFC0A22_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_11B27642_004A_EB3A_4142_7CBC8EFC0A22_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_11B27642_004A_EB3A_4142_7CBC8EFC0A22_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_11B27642_004A_EB3A_4142_7CBC8EFC0A22_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_11B27642_004A_EB3A_4142_7CBC8EFC0A22_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_11B27642_004A_EB3A_4142_7CBC8EFC0A22_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_11B27642_004A_EB3A_4142_7CBC8EFC0A22_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "adjacentPanoramas": [
  {
   "yaw": -130.75,
   "panorama": "this.panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9",
   "backwardYaw": 118.11,
   "class": "AdjacentPanorama",
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 140
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_camera"
},
{
 "hfov": 360,
 "vfov": 180,
 "class": "Panorama",
 "label": "3bhk_BDRoom03_toilet copy",
 "id": "panorama_12B1E6F5_004A_E8DE_4153_B75256AABCDC",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_12B1E6F5_004A_E8DE_4153_B75256AABCDC_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_12B1E6F5_004A_E8DE_4153_B75256AABCDC_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_12B1E6F5_004A_E8DE_4153_B75256AABCDC_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_12B1E6F5_004A_E8DE_4153_B75256AABCDC_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_12B1E6F5_004A_E8DE_4153_B75256AABCDC_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_12B1E6F5_004A_E8DE_4153_B75256AABCDC_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_12B1E6F5_004A_E8DE_4153_B75256AABCDC_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_12B1E6F5_004A_E8DE_4153_B75256AABCDC_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_12B1E6F5_004A_E8DE_4153_B75256AABCDC_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_12B1E6F5_004A_E8DE_4153_B75256AABCDC_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_12B1E6F5_004A_E8DE_4153_B75256AABCDC_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_12B1E6F5_004A_E8DE_4153_B75256AABCDC_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_12B1E6F5_004A_E8DE_4153_B75256AABCDC_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_12B1E6F5_004A_E8DE_4153_B75256AABCDC_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_12B1E6F5_004A_E8DE_4153_B75256AABCDC_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_12B1E6F5_004A_E8DE_4153_B75256AABCDC_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_12B1E6F5_004A_E8DE_4153_B75256AABCDC_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "pitch": 0,
 "thumbnailUrl": "media/panorama_12B1E6F5_004A_E8DE_4153_B75256AABCDC_t.jpg",
 "partial": false,
 "hfovMax": 140
},
{
 "label": "3bhk_bedroom01_toilet copy",
 "id": "panorama_11AC3D3D_004A_F94E_4142_D27F9A1181D7",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_11AC3D3D_004A_F94E_4142_D27F9A1181D7_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_146737F2_0057_E8DA_4155_00C91D7C48D2"
 ],
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_11AC3D3D_004A_F94E_4142_D27F9A1181D7_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_11AC3D3D_004A_F94E_4142_D27F9A1181D7_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_11AC3D3D_004A_F94E_4142_D27F9A1181D7_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_11AC3D3D_004A_F94E_4142_D27F9A1181D7_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_11AC3D3D_004A_F94E_4142_D27F9A1181D7_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_11AC3D3D_004A_F94E_4142_D27F9A1181D7_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_11AC3D3D_004A_F94E_4142_D27F9A1181D7_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_11AC3D3D_004A_F94E_4142_D27F9A1181D7_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_11AC3D3D_004A_F94E_4142_D27F9A1181D7_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_11AC3D3D_004A_F94E_4142_D27F9A1181D7_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_11AC3D3D_004A_F94E_4142_D27F9A1181D7_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_11AC3D3D_004A_F94E_4142_D27F9A1181D7_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_11AC3D3D_004A_F94E_4142_D27F9A1181D7_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_11AC3D3D_004A_F94E_4142_D27F9A1181D7_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_11AC3D3D_004A_F94E_4142_D27F9A1181D7_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_11AC3D3D_004A_F94E_4142_D27F9A1181D7_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_11AC3D3D_004A_F94E_4142_D27F9A1181D7_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "adjacentPanoramas": [
  {
   "yaw": -5.52,
   "panorama": "this.panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590",
   "backwardYaw": -117.07,
   "class": "AdjacentPanorama",
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 140
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 135,
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_11B27642_004A_EB3A_4142_7CBC8EFC0A22_camera"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": 170.55,
  "class": "PanoramaCameraPosition",
  "pitch": 1.1
 },
 "id": "panorama_3FE2707B_32AC_B48E_41C6_A7FCAE50A2B6_camera"
},
{
 "label": "3bhk 02 entrance 23rd floor",
 "id": "panorama_3F570BCA_32AC_AB8E_418D_9A4B6CEEBAEF",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_3F570BCA_32AC_AB8E_418D_9A4B6CEEBAEF_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_209C93E9_32AC_5B8A_41B3_4E23C1D3F27C",
  "this.overlay_20487ACB_32AC_D58E_41C3_0FCD15BCFE67",
  "this.overlay_21CEA0BD_32AF_F58A_41C6_02D8A6F2F8C3"
 ],
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F570BCA_32AC_AB8E_418D_9A4B6CEEBAEF_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_3F570BCA_32AC_AB8E_418D_9A4B6CEEBAEF_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_3F570BCA_32AC_AB8E_418D_9A4B6CEEBAEF_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_3F570BCA_32AC_AB8E_418D_9A4B6CEEBAEF_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_3F570BCA_32AC_AB8E_418D_9A4B6CEEBAEF_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_3F570BCA_32AC_AB8E_418D_9A4B6CEEBAEF_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_3F570BCA_32AC_AB8E_418D_9A4B6CEEBAEF_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_3F570BCA_32AC_AB8E_418D_9A4B6CEEBAEF_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_3F570BCA_32AC_AB8E_418D_9A4B6CEEBAEF_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_3F570BCA_32AC_AB8E_418D_9A4B6CEEBAEF_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_3F570BCA_32AC_AB8E_418D_9A4B6CEEBAEF_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_3F570BCA_32AC_AB8E_418D_9A4B6CEEBAEF_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_3F570BCA_32AC_AB8E_418D_9A4B6CEEBAEF_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_3F570BCA_32AC_AB8E_418D_9A4B6CEEBAEF_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_3F570BCA_32AC_AB8E_418D_9A4B6CEEBAEF_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_3F570BCA_32AC_AB8E_418D_9A4B6CEEBAEF_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_3F570BCA_32AC_AB8E_418D_9A4B6CEEBAEF_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "adjacentPanoramas": [
  {
   "yaw": 6.71,
   "panorama": "this.panorama_3E7EC44F_32AB_DC87_41C2_5748F1C76A53",
   "backwardYaw": -5.48,
   "class": "AdjacentPanorama",
   "distance": 1
  },
  {
   "yaw": 125.78,
   "panorama": "this.panorama_3F79A584_32AC_5C7A_419D_E5B5EC2463D0",
   "backwardYaw": 151.67,
   "class": "AdjacentPanorama",
   "distance": 1
  },
  {
   "yaw": -56.11,
   "panorama": "this.panorama_0EF390FE_019F_1938_4173_7E5BC178F7F6",
   "backwardYaw": 103.66,
   "class": "AdjacentPanorama",
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 140
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": -28.33,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_80D7F0F5_8CB4_B9F9_41A8_3302B3873582"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": -144.04,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_818FD17E_8CB4_B8EA_41CD_10B22C70A1D5"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -38.12,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_803343AE_8CB4_B86A_41C9_5316C31CEB06"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": 175.36,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_807273DE_8CB4_B82A_41B1_6E074B2033B1"
},
{
 "label": "3bhk bedroom02 1 33rd",
 "id": "panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_E483FB4F_C654_C85F_41D6_EB69928269D3",
  "this.overlay_15B8B6A2_0608_E231_4196_4E1A0E5B8274"
 ],
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "adjacentPanoramas": [
  {
   "yaw": 117.73,
   "panorama": "this.panorama_118A5E95_004A_FB5E_414F_25F73E14E9E4",
   "backwardYaw": -131.63,
   "class": "AdjacentPanorama",
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40"
  }
 ],
 "vfov": 180,
 "hfovMax": 140
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 135,
  "yaw": -144.7,
  "class": "PanoramaCameraPosition",
  "pitch": -9.3
 },
 "id": "panorama_0C72BAA0_0039_5B76_4145_C1EF94F793A0_camera"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": 111.03,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_811641B6_8CB4_B87A_41D6_F0855D41950C"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_camera"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": 86.08,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_81E33446_8CB4_B81B_41D1_9EA5A2B6DE1E"
},
{
 "label": "3bhk_BDRoom03_toilet copy",
 "id": "panorama_136FCF41_004A_D936_4151_FFADF2CFBA26",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_136FCF41_004A_D936_4151_FFADF2CFBA26_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_163A1A6F_005F_DBCA_4143_609D9385BACF"
 ],
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_136FCF41_004A_D936_4151_FFADF2CFBA26_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_136FCF41_004A_D936_4151_FFADF2CFBA26_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_136FCF41_004A_D936_4151_FFADF2CFBA26_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_136FCF41_004A_D936_4151_FFADF2CFBA26_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_136FCF41_004A_D936_4151_FFADF2CFBA26_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_136FCF41_004A_D936_4151_FFADF2CFBA26_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_136FCF41_004A_D936_4151_FFADF2CFBA26_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_136FCF41_004A_D936_4151_FFADF2CFBA26_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_136FCF41_004A_D936_4151_FFADF2CFBA26_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_136FCF41_004A_D936_4151_FFADF2CFBA26_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_136FCF41_004A_D936_4151_FFADF2CFBA26_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_136FCF41_004A_D936_4151_FFADF2CFBA26_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_136FCF41_004A_D936_4151_FFADF2CFBA26_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_136FCF41_004A_D936_4151_FFADF2CFBA26_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_136FCF41_004A_D936_4151_FFADF2CFBA26_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_136FCF41_004A_D936_4151_FFADF2CFBA26_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_136FCF41_004A_D936_4151_FFADF2CFBA26_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "adjacentPanoramas": [
  {
   "yaw": 61.56,
   "panorama": "this.panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D",
   "backwardYaw": -94.17,
   "class": "AdjacentPanorama",
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 140
},
{
 "label": "Powder toilet 3BHK",
 "id": "panorama_0E9BEAA3_0199_09C8_416E_D3D5D37321FD",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_0E9BEAA3_0199_09C8_416E_D3D5D37321FD_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_105CC9D2_01A7_0B48_4158_008E8092F603"
 ],
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0E9BEAA3_0199_09C8_416E_D3D5D37321FD_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_0E9BEAA3_0199_09C8_416E_D3D5D37321FD_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0E9BEAA3_0199_09C8_416E_D3D5D37321FD_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_0E9BEAA3_0199_09C8_416E_D3D5D37321FD_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_0E9BEAA3_0199_09C8_416E_D3D5D37321FD_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0E9BEAA3_0199_09C8_416E_D3D5D37321FD_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_0E9BEAA3_0199_09C8_416E_D3D5D37321FD_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_0E9BEAA3_0199_09C8_416E_D3D5D37321FD_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0E9BEAA3_0199_09C8_416E_D3D5D37321FD_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_0E9BEAA3_0199_09C8_416E_D3D5D37321FD_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0E9BEAA3_0199_09C8_416E_D3D5D37321FD_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_0E9BEAA3_0199_09C8_416E_D3D5D37321FD_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_0E9BEAA3_0199_09C8_416E_D3D5D37321FD_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0E9BEAA3_0199_09C8_416E_D3D5D37321FD_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_0E9BEAA3_0199_09C8_416E_D3D5D37321FD_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_0E9BEAA3_0199_09C8_416E_D3D5D37321FD_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0E9BEAA3_0199_09C8_416E_D3D5D37321FD_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "adjacentPanoramas": [
  {
   "yaw": 105.8,
   "panorama": "this.panorama_3FE2707B_32AC_B48E_41C6_A7FCAE50A2B6",
   "backwardYaw": -56.87,
   "class": "AdjacentPanorama",
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 140
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 18.6,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_818E8433_8CB4_B87A_41D9_FE42E21833BB"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": 158.94,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_814F61E5_8CB4_B81E_41CB_5D037CDA42F9"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": 129.15,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_83E7C05C_8CB4_B82F_41DD_BAEB6A4A8202"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": 31.79,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_824732BC_8CB4_B86F_41E0_840A5132F419"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 26.51,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 26.51,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 26.51,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": 42.01,
  "class": "PanoramaCameraPosition",
  "pitch": 1.1
 },
 "id": "panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_camera"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA_camera"
},
{
 "label": "3bhk bedroom02 23rd",
 "id": "panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_D7E43C95_C654_48C3_41D5_D441E8F4B5BE",
  "this.overlay_D78C34B1_C654_58C3_41C3_A038E40060B3",
  "this.overlay_25020B30_329F_B499_41C0_7B8448BA652A"
 ],
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "adjacentPanoramas": [
  {
   "yaw": 33.02,
   "panorama": "this.panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2",
   "backwardYaw": -61.42,
   "class": "AdjacentPanorama",
   "distance": 1
  },
  {
   "yaw": -117.07,
   "panorama": "this.panorama_11AC3D3D_004A_F94E_4142_D27F9A1181D7",
   "backwardYaw": -5.52,
   "class": "AdjacentPanorama",
   "distance": 1
  },
  {
   "yaw": -157.27,
   "panorama": "this.panorama_3F79A584_32AC_5C7A_419D_E5B5EC2463D0",
   "backwardYaw": -124.47,
   "class": "AdjacentPanorama",
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 140
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": -62.9,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_806C13EE_8CB4_BFEA_41E0_D21D3F15A58B"
},
{
 "label": "3bhk kitchen",
 "id": "panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_D6BEFA7F_C64C_483F_41C3_9F7466FB8F67"
 ],
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3E7EC44F_32AB_DC87_41C2_5748F1C76A53"
  }
 ],
 "vfov": 180,
 "hfovMax": 140
},
{
 "label": "3bhk_bedroom01_toilet copy",
 "id": "panorama_0B55BDE4_0039_38FE_4139_E851DEBF7C58",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_0B55BDE4_0039_38FE_4139_E851DEBF7C58_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_12802B79_0076_D9D6_40D5_A735950E3D00"
 ],
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0B55BDE4_0039_38FE_4139_E851DEBF7C58_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_0B55BDE4_0039_38FE_4139_E851DEBF7C58_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0B55BDE4_0039_38FE_4139_E851DEBF7C58_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_0B55BDE4_0039_38FE_4139_E851DEBF7C58_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_0B55BDE4_0039_38FE_4139_E851DEBF7C58_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0B55BDE4_0039_38FE_4139_E851DEBF7C58_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_0B55BDE4_0039_38FE_4139_E851DEBF7C58_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_0B55BDE4_0039_38FE_4139_E851DEBF7C58_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0B55BDE4_0039_38FE_4139_E851DEBF7C58_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_0B55BDE4_0039_38FE_4139_E851DEBF7C58_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0B55BDE4_0039_38FE_4139_E851DEBF7C58_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_0B55BDE4_0039_38FE_4139_E851DEBF7C58_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_0B55BDE4_0039_38FE_4139_E851DEBF7C58_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0B55BDE4_0039_38FE_4139_E851DEBF7C58_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_0B55BDE4_0039_38FE_4139_E851DEBF7C58_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_0B55BDE4_0039_38FE_4139_E851DEBF7C58_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0B55BDE4_0039_38FE_4139_E851DEBF7C58_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "adjacentPanoramas": [
  {
   "yaw": -3.63,
   "panorama": "this.panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5",
   "backwardYaw": -115.31,
   "class": "AdjacentPanorama",
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 136
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": -52.96,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_83A612CF_8CB4_B82A_41A0_4C927A53890A"
},
{
 "label": "3bhk bedroom03 01 23rd",
 "id": "panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_D52AF8AA_C65C_C8C1_41E1_368B77920405",
  "this.overlay_D5F4BE96_C654_C8C1_41E5_91FDE5D191D9"
 ],
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "adjacentPanoramas": [
  {
   "yaw": 151.74,
   "panorama": "this.panorama_3E7EC44F_32AB_DC87_41C2_5748F1C76A53",
   "backwardYaw": 35.46,
   "class": "AdjacentPanorama",
   "distance": 1
  },
  {
   "yaw": 43.8,
   "panorama": "this.panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D",
   "backwardYaw": -54.9,
   "class": "AdjacentPanorama",
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 140
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_3E3ACD8A_32AC_AF89_41C5_288091B6AF29_camera"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": -28.54,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_838962EE_8CB4_B9EA_41DA_04416895F9E5"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": -138.7,
  "class": "PanoramaCameraPosition",
  "pitch": -4.92
 },
 "id": "panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5_camera"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": -28.26,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_80EAE374_8CB4_B8FE_41CA_6D488C0A1AD0"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 135,
  "yaw": 48.37,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_832B1327_8CB4_B81A_4197_3917F25E3E24"
},
{
 "label": "3bhk bedroom01 33rd",
 "id": "panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_E7E37E24_C654_4BC2_41E1_8DC9EEC30B49"
 ],
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "adjacentPanoramas": [
  {
   "yaw": -68.97,
   "panorama": "this.panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068",
   "backwardYaw": 37.55,
   "class": "AdjacentPanorama",
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 140
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": 14.58,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_80CB13A4_8CB4_B81E_41DE_042FB48B1D5B"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 173.35,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_809110C4_8CB4_B81E_41DD_2880872F7B25"
},
{
 "label": "3BHK_Bolcony_23",
 "id": "panorama_3E62E564_32A4_DCB9_41BD_32CA02213B87",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_3E62E564_32A4_DCB9_41BD_32CA02213B87_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_271AF4F3_32A4_7D9F_4183_723DC0E5E4C1"
 ],
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E62E564_32A4_DCB9_41BD_32CA02213B87_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_3E62E564_32A4_DCB9_41BD_32CA02213B87_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_3E62E564_32A4_DCB9_41BD_32CA02213B87_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_3E62E564_32A4_DCB9_41BD_32CA02213B87_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_3E62E564_32A4_DCB9_41BD_32CA02213B87_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_3E62E564_32A4_DCB9_41BD_32CA02213B87_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_3E62E564_32A4_DCB9_41BD_32CA02213B87_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_3E62E564_32A4_DCB9_41BD_32CA02213B87_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_3E62E564_32A4_DCB9_41BD_32CA02213B87_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_3E62E564_32A4_DCB9_41BD_32CA02213B87_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_3E62E564_32A4_DCB9_41BD_32CA02213B87_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_3E62E564_32A4_DCB9_41BD_32CA02213B87_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_3E62E564_32A4_DCB9_41BD_32CA02213B87_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_3E62E564_32A4_DCB9_41BD_32CA02213B87_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_3E62E564_32A4_DCB9_41BD_32CA02213B87_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_3E62E564_32A4_DCB9_41BD_32CA02213B87_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_3E62E564_32A4_DCB9_41BD_32CA02213B87_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "adjacentPanoramas": [
  {
   "yaw": -165.42,
   "panorama": "this.panorama_3F79A584_32AC_5C7A_419D_E5B5EC2463D0",
   "backwardYaw": -5.64,
   "class": "AdjacentPanorama",
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 140
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 26.51,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 26.51,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 26.51,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": -61.89,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_8051D3F7_8CB4_BFFA_41B7_267D96756AFE"
},
{
 "label": "3bhk Passage 23rd floor",
 "id": "panorama_3E7EC44F_32AB_DC87_41C2_5748F1C76A53",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_3E7EC44F_32AB_DC87_41C2_5748F1C76A53_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_27335F89_32A4_AB8A_41C1_9B84E0221C2D",
  "this.overlay_24F6F26A_32A4_5489_41C4_EC701E187A22",
  "this.overlay_243CA586_32A4_7C79_4170_A5E3FF8D61C7"
 ],
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E7EC44F_32AB_DC87_41C2_5748F1C76A53_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_3E7EC44F_32AB_DC87_41C2_5748F1C76A53_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_3E7EC44F_32AB_DC87_41C2_5748F1C76A53_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_3E7EC44F_32AB_DC87_41C2_5748F1C76A53_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_3E7EC44F_32AB_DC87_41C2_5748F1C76A53_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_3E7EC44F_32AB_DC87_41C2_5748F1C76A53_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_3E7EC44F_32AB_DC87_41C2_5748F1C76A53_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_3E7EC44F_32AB_DC87_41C2_5748F1C76A53_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_3E7EC44F_32AB_DC87_41C2_5748F1C76A53_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_3E7EC44F_32AB_DC87_41C2_5748F1C76A53_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_3E7EC44F_32AB_DC87_41C2_5748F1C76A53_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_3E7EC44F_32AB_DC87_41C2_5748F1C76A53_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_3E7EC44F_32AB_DC87_41C2_5748F1C76A53_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_3E7EC44F_32AB_DC87_41C2_5748F1C76A53_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "url": "media/panorama_3E7EC44F_32AB_DC87_41C2_5748F1C76A53_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_3E7EC44F_32AB_DC87_41C2_5748F1C76A53_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_3E7EC44F_32AB_DC87_41C2_5748F1C76A53_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "adjacentPanoramas": [
  {
   "yaw": -5.48,
   "panorama": "this.panorama_3F570BCA_32AC_AB8E_418D_9A4B6CEEBAEF",
   "backwardYaw": 6.71,
   "class": "AdjacentPanorama",
   "distance": 1
  },
  {
   "yaw": 35.46,
   "panorama": "this.panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7",
   "backwardYaw": 151.74,
   "class": "AdjacentPanorama",
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9"
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "label": "3bhk bedroom03 02 17th",
 "id": "panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_D7296732_C3F0_99BD_41CD_15546F96B28A",
  "this.overlay_1497DBE8_0678_E232_4180_BC51F5A3B938"
 ],
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
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
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "adjacentPanoramas": [
  {
   "yaw": -50.85,
   "panorama": "this.panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A",
   "backwardYaw": 44.28,
   "class": "AdjacentPanorama",
   "distance": 1
  },
  {
   "yaw": -93.55,
   "panorama": "this.panorama_0C72BAA0_0039_5B76_4145_C1EF94F793A0",
   "backwardYaw": 60.43,
   "class": "AdjacentPanorama",
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 140
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 135,
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_12B1E6F5_004A_E8DE_4153_B75256AABCDC_camera"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": 172.24,
  "class": "PanoramaCameraPosition",
  "pitch": 2.13
 },
 "id": "panorama_3E110129_32A4_548A_41A6_17FA339053A0_camera"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": -27.03,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_81C5E19E_8CB4_B82A_41D6_181B31AD321E"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A_camera"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": 33.34,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_81AAC41F_8CB4_B829_41D2_F2972A3AD01D"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 135,
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_11906CBC_0049_DF4E_411B_4127E5D5F480_camera"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 13.26,
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_camera"
},
{
 "playbackBarOpacity": 1,
 "id": "MainViewer",
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "progressBarOpacity": 1,
 "vrPointerColor": "#FFFFFF",
 "playbackBarHeadShadowVerticalLength": 0,
 "width": "100%",
 "progressBorderSize": 0,
 "transitionMode": "blending",
 "playbackBarHeadShadowOpacity": 0.7,
 "toolTipBorderSize": 1,
 "toolTipPaddingRight": 6,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderRadius": 0,
 "paddingBottom": 0,
 "toolTipPaddingTop": 4,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "borderSize": 0,
 "toolTipPaddingLeft": 6,
 "borderRadius": 0,
 "toolTipDisplayTime": 600,
 "playbackBarLeft": 0,
 "minHeight": 50,
 "progressBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 0,
 "toolTipBorderRadius": 3,
 "displayTooltipInTouchScreens": true,
 "playbackBarHeadHeight": 15,
 "progressBackgroundColorDirection": "vertical",
 "playbackBarHeadShadowBlurRadius": 3,
 "playbackBarBottom": 5,
 "progressBarBorderColor": "#000000",
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBorderColor": "#000000",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "height": "100%",
 "toolTipShadowSpread": 0,
 "playbackBarHeadOpacity": 1,
 "minWidth": 100,
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
 "playbackBarHeadShadowHorizontalLength": 0,
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
 "class": "ViewerArea",
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
 "toolTipShadowHorizontalLength": 0,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "toolTipFontFamily": "Arial",
 "toolTipShadowVerticalLength": 0,
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
   "click": "this.startPanoramaWithCamera(this.panorama_C8E22910_C38F_897E_41BD_C3761AC35EAF, this.camera_17D98EBF_0678_E20E_4193_A84F928CB1B2)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 16.3,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0DDD37F8_019B_0738_4165_2278D9DB7F90_1_HS_0_0.png",
      "width": 272,
      "height": 253,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 3.59,
   "yaw": 103.26
  }
 ],
 "id": "overlay_0EC38AAB_019F_09D8_4148_F13840F3A30E",
 "maps": [
  {
   "hfov": 16.3,
   "yaw": 103.26,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0DDD37F8_019B_0738_4165_2278D9DB7F90_1_HS_0_0_0_map.gif",
      "width": 17,
      "height": 15,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 3.59,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3FF204B8_32AD_FD8A_41C8_A348279F77D9, this.camera_81BAF166_8CB4_B81A_41B9_94F6029CD6E4); this.mainPlayList.set('selectedIndex', 31)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 22.75,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_1_HS_0_0.png",
      "width": 318,
      "height": 295,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 7.66,
   "yaw": -148.21
  }
 ],
 "id": "overlay_DF50E086_C674_38C1_41C4_7464DFF3A926",
 "maps": [
  {
   "hfov": 22.75,
   "yaw": -148.21,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_1_HS_0_0_0_map.gif",
      "width": 17,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 7.66,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5, this.camera_81ACE16E_8CB4_B8EA_41C4_E68BB0DA55D7); this.mainPlayList.set('selectedIndex', 40)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 01a"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EE9D7527_C634_79CF_41D8_0EE7C8EAC465",
   "pitch": -37.88,
   "yaw": -21.75,
   "hfov": 15.34,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_DFC10996_C674_48CE_41D4_631A257C6571",
 "maps": [
  {
   "hfov": 15.34,
   "yaw": -21.75,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_1_HS_1_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -37.88,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3E24D2BF_32A4_D587_4192_FCC0A640BC00, this.camera_816D41D5_8CB4_B83E_41B2_49758F0C5737); this.mainPlayList.set('selectedIndex', 49)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 01a"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_2FBE7AA4_3DB9_B172_41A8_CCD591077E0E",
   "pitch": -19.53,
   "yaw": 6.33,
   "hfov": 13.59,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_116E2FDA_337C_6B8E_41AD_4671109176B5",
 "maps": [
  {
   "hfov": 13.59,
   "yaw": 6.33,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E110129_32A4_548A_41A6_17FA339053A0_1_HS_0_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -19.53,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_0F2964AA_0199_39D8_415C_DAB75F704D09, this.camera_817AC1CD_8CB4_B82E_41D1_7E7F8648923B); this.mainPlayList.set('selectedIndex', 48)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.87,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E110129_32A4_548A_41A6_17FA339053A0_1_HS_1_0.png",
      "width": 151,
      "height": 151,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -0.1,
   "yaw": -55.99
  }
 ],
 "id": "overlay_11C51F4E_337C_EC86_41A2_7813FDA2140E",
 "maps": [
  {
   "hfov": 10.87,
   "yaw": -55.99,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E110129_32A4_548A_41A6_17FA339053A0_1_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -0.1,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3E3FB1E6_32A7_D786_41C1_CD16D7C1F309, this.camera_810B21C5_8CB4_B81E_41B8_47DE3B12E5CA); this.mainPlayList.set('selectedIndex', 46)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 01a"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_2FBF4AA5_3DB9_B172_41C3_E5ED237F8206",
   "pitch": -36.99,
   "yaw": 126.16,
   "hfov": 15.53,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_106A55D6_337D_FF86_4174_0A0E29237D58",
 "maps": [
  {
   "hfov": 15.53,
   "yaw": 126.16,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E110129_32A4_548A_41A6_17FA339053A0_1_HS_2_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -36.99,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5, this.camera_82817226_8CB4_B81B_41B3_BCBD2E1943A8); this.mainPlayList.set('selectedIndex', 6)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 01a"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EE96F517_C634_79CF_41DD_B98B1CDAC4EF",
   "pitch": -30.57,
   "yaw": -64.1,
   "hfov": 14.14,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_D1422BDB_C3F3_88E2_41BD_FA3D9EE50658",
 "maps": [
  {
   "hfov": 14.14,
   "yaw": -64.1,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23_1_HS_0_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -30.57,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3F79A584_32AC_5C7A_419D_E5B5EC2463D0, this.camera_80C18106_8CB4_B81A_41DD_A6140A6998F2); this.mainPlayList.set('selectedIndex', 16)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 20.21,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_1_HS_0_0.png",
      "width": 280,
      "height": 330,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 0.66,
   "yaw": -145.19
  }
 ],
 "id": "overlay_D409C066_C655_F841_41C2_9E382AAA888D",
 "maps": [
  {
   "hfov": 20.21,
   "yaw": -145.19,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_1_HS_0_0_0_map.gif",
      "width": 16,
      "height": 18,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 0.66,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9, this.camera_8035D10E_8CB4_B82A_41D1_8FA9C49834B2); this.mainPlayList.set('selectedIndex', 25)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 01a"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EE93A51E_C634_79C1_41E1_1FE79DE4D4E8",
   "pitch": -33.56,
   "yaw": -20.79,
   "hfov": 16.2,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_D4F58EF9_C654_C843_41C9_E71581556A11",
 "maps": [
  {
   "hfov": 16.2,
   "yaw": -20.79,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_1_HS_1_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -33.56,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0, this.camera_83A1A033_8CB4_B879_41E0_42726FAD54AC); this.mainPlayList.set('selectedIndex', 57)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 01a"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EE85E53C_C634_79C1_41DB_7F3562B22FD2",
   "pitch": -32.43,
   "yaw": -49.96,
   "hfov": 16.41,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_E24DF921_C64C_C9C3_41E0_1DE050A43B4D",
 "maps": [
  {
   "hfov": 16.41,
   "yaw": -49.96,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA_1_HS_0_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -32.43,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 59)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 8.11,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA_1_HS_2_0.png",
      "width": 112,
      "height": 151,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 0.4,
   "yaw": -93.55
  }
 ],
 "id": "overlay_12D086AB_0608_6236_4191_C3F4174FECF3",
 "maps": [
  {
   "hfov": 8.11,
   "yaw": -93.55,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA_1_HS_2_0_0_map.gif",
      "width": 16,
      "height": 21,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 0.4,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4, this.camera_83E7C05C_8CB4_B82F_41DD_BAEB6A4A8202); this.mainPlayList.set('selectedIndex', 13)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 01a"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EE973518_C634_79C1_41B1_D4F6FE4DD0CE",
   "pitch": -33.11,
   "yaw": 44.28,
   "hfov": 16.28,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_D7B8A38F_C3F7_B962_4174_75177DEADA11",
 "maps": [
  {
   "hfov": 16.28,
   "yaw": 44.28,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_1_HS_0_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -33.11,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C857B562_C391_99A2_41D4_622CFBF52C0A, this.camera_83F43051_8CB4_B839_41D2_2DF156EAE79B); this.mainPlayList.set('selectedIndex', 4)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 14.7,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_1_HS_1_0.png",
      "width": 204,
      "height": 212,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 2.75,
   "yaw": 153.25
  }
 ],
 "id": "overlay_D7F45601_C3F0_BB5E_41C2_C0C993F67D5C",
 "maps": [
  {
   "hfov": 14.7,
   "yaw": 153.25,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_1_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 2.75,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3FF204B8_32AD_FD8A_41C8_A348279F77D9, this.camera_8056E14F_8CB4_B82A_418A_771F066A2220); this.mainPlayList.set('selectedIndex', 31)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 01a"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_2FB30A9A_3DB9_B156_4187_5826CFA6BB9D",
   "pitch": -30.96,
   "yaw": 127.04,
   "hfov": 13.01,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_2ACF84C0_3365_FDFA_41BD_59A171EDC470",
 "maps": [
  {
   "hfov": 13.01,
   "yaw": 127.04,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FE2707B_32AC_B48E_41C6_A7FCAE50A2B6_1_HS_0_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -30.96,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_0E9BEAA3_0199_09C8_416E_D3D5D37321FD, this.camera_80583157_8CB4_B83A_41AA_22F5C57B0291); this.mainPlayList.set('selectedIndex', 33)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 8.61,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FE2707B_32AC_B48E_41C6_A7FCAE50A2B6_1_HS_1_0.png",
      "width": 119,
      "height": 137,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -0.6,
   "yaw": -56.87
  }
 ],
 "id": "overlay_2AFC3B23_336B_B4BE_41BB_3885A3BF30E6",
 "maps": [
  {
   "hfov": 8.61,
   "yaw": -56.87,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FE2707B_32AC_B48E_41C6_A7FCAE50A2B6_1_HS_1_0_0_map.gif",
      "width": 16,
      "height": 18,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -0.6,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3E3ACD8A_32AC_AF89_41C5_288091B6AF29, this.camera_804A315F_8CB4_B82A_41C0_CD029088EBE1); this.mainPlayList.set('selectedIndex', 34)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 01a"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_2FB3CA9A_3DB9_B156_41C8_783D55DDF941",
   "pitch": -19.28,
   "yaw": 5.32,
   "hfov": 11.24,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_299FD28A_336D_D589_41B8_F82AB0ACDC68",
 "maps": [
  {
   "hfov": 11.24,
   "yaw": 5.32,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FE2707B_32AC_B48E_41C6_A7FCAE50A2B6_1_HS_2_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -19.28,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3F570BCA_32AC_AB8E_418D_9A4B6CEEBAEF, this.camera_8099F0CC_8CB4_B82F_41C3_45FEDA430A97); this.mainPlayList.set('selectedIndex', 15)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 18.26,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0EF390FE_019F_1938_4173_7E5BC178F7F6_1_HS_0_0.png",
      "width": 304,
      "height": 308,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 0.31,
   "yaw": 103.66
  }
 ],
 "id": "overlay_11D521B2_019B_1BC8_416F_DC66A9296BC0",
 "maps": [
  {
   "hfov": 18.26,
   "yaw": 103.66,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0EF390FE_019F_1938_4173_7E5BC178F7F6_1_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 0.31,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3E3ACD8A_32AC_AF89_41C5_288091B6AF29, this.camera_8039C3B6_8CB4_B87A_4194_634210D868BE); this.mainPlayList.set('selectedIndex', 34)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 01"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EE9F5524_C634_79C1_4151_C56E80BD365E",
   "pitch": -29.36,
   "yaw": 5.82,
   "hfov": 9.97,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_DE130192_C67C_38C1_41C4_0A4C5ECF7BB5",
 "maps": [
  {
   "hfov": 9.97,
   "yaw": 5.82,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9_1_HS_0_0_0_map.gif",
      "width": 17,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -29.36,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3FE2707B_32AC_B48E_41C6_A7FCAE50A2B6, this.camera_8397D2D9_8CB4_B829_41D0_1739A40B7411); this.mainPlayList.set('selectedIndex', 30)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 01a"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_2FB6BAA1_3DB9_B172_41BF_431C931B8E55",
   "pitch": -21.92,
   "yaw": -6.11,
   "hfov": 11.74,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_2ECD8898_336B_B58A_41C3_B1EA3ED1BC44",
 "maps": [
  {
   "hfov": 11.74,
   "yaw": -6.11,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E3ACD8A_32AC_AF89_41C5_288091B6AF29_1_HS_0_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -21.92,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B, this.camera_838962EE_8CB4_B9EA_41DA_04416895F9E5); this.mainPlayList.set('selectedIndex', 42)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.87,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E3ACD8A_32AC_AF89_41C5_288091B6AF29_1_HS_1_0.png",
      "width": 151,
      "height": 151,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -0.35,
   "yaw": 35.96
  }
 ],
 "id": "overlay_2D649786_336B_BC79_4177_4EF46C89C11B",
 "maps": [
  {
   "hfov": 10.87,
   "yaw": 35.96,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E3ACD8A_32AC_AF89_41C5_288091B6AF29_1_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -0.35,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9, this.camera_8387F2E3_8CB4_B819_41A1_D5663CDE7487); this.mainPlayList.set('selectedIndex', 35)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 01"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_2FB79AA1_3DB9_B172_41B5_E3EC438149A5",
   "pitch": -47.79,
   "yaw": -84.87,
   "hfov": 10.35,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_2C47FE1E_3364_AC86_41BD_92D8DE077FEE",
 "maps": [
  {
   "hfov": 10.35,
   "yaw": -84.87,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E3ACD8A_32AC_AF89_41C5_288091B6AF29_1_HS_2_0_0_map.gif",
      "width": 17,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -47.79,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3FF204B8_32AD_FD8A_41C8_A348279F77D9, this.camera_81F03186_8CB4_B81A_41CD_43E78040F92B); this.mainPlayList.set('selectedIndex', 31)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.87,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_1_HS_0_0.png",
      "width": 150,
      "height": 150,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 1.24,
   "yaw": -158.16
  }
 ],
 "id": "overlay_DE78BD94_C67C_48C1_41E0_19E3E3F56405",
 "maps": [
  {
   "hfov": 10.87,
   "yaw": -158.16,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_1_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 1.24,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5, this.camera_81E0E18E_8CB4_B82A_41C6_7CC9CB2560D2); this.mainPlayList.set('selectedIndex', 37)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 01a"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EE9C0525_C634_79C3_41E5_176E60E12F40",
   "pitch": -36.48,
   "yaw": 39.47,
   "hfov": 15.63,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_DEFD2A97_C674_C8CF_41E4_A52F962F63C7",
 "maps": [
  {
   "hfov": 15.63,
   "yaw": 39.47,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_1_HS_1_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -36.48,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 38)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 01 Right"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_2FB92AA2_3DB9_B176_4196_9249EBB0A1F4",
   "pitch": -2.2,
   "yaw": -115.18,
   "hfov": 11.05,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_1253AE9D_3364_6D8B_41C1_543577C932F6",
 "maps": [
  {
   "hfov": 11.05,
   "yaw": -115.18,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_1_HS_3_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -2.2,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9, this.camera_814F61E5_8CB4_B81E_41CB_5D037CDA42F9); this.mainPlayList.set('selectedIndex', 9)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 01a"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EE978518_C634_79C1_41BF_08456E54B1D1",
   "pitch": -42.82,
   "yaw": 88.82,
   "hfov": 14.26,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_D06F55C7_C3F0_98E2_41E3_464100BECDC1",
 "maps": [
  {
   "hfov": 14.26,
   "yaw": 88.82,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40_1_HS_0_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -42.82,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_0B65F72F_0039_294A_413D_7167CFDDAD60, this.camera_815C21DD_8CB4_B829_41E1_54E67F0C5EE3); this.mainPlayList.set('selectedIndex', 11)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.87,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40_1_HS_2_0.png",
      "width": 151,
      "height": 151,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 0.58,
   "yaw": 119.11
  }
 ],
 "id": "overlay_09FA2596_0678_A611_4196_27395AC63D08",
 "maps": [
  {
   "hfov": 10.87,
   "yaw": 119.11,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40_1_HS_2_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 0.58,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3E3FB1E6_32A7_D786_41C1_CD16D7C1F309, this.camera_82BF71F7_8CB4_BBFA_41DC_6C21B6DEA978); this.mainPlayList.set('selectedIndex', 46)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 19.38,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_1_HS_0_0.png",
      "width": 269,
      "height": 311,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -0.85,
   "yaw": -145.32
  }
 ],
 "id": "overlay_E468F0B7_C654_58CF_41DE_C89AEED028EF",
 "maps": [
  {
   "hfov": 19.38,
   "yaw": -145.32,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_1_HS_0_0_0_map.gif",
      "width": 16,
      "height": 18,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -0.85,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 55)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 01a"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EE872539_C634_79C3_41C0_5F139E4D450B",
   "pitch": -36.3,
   "yaw": -26.28,
   "hfov": 15.67,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_E4E80CAC_C657_C8C1_41D8_7F180578F07D",
 "maps": [
  {
   "hfov": 15.67,
   "yaw": -26.28,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_1_HS_1_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -36.3,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C8E22910_C38F_897E_41BD_C3761AC35EAF, this.camera_0958ED1C_0678_E612_4192_FD46D26A5AD0)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 01a"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EEA83515_C634_79C3_41D3_CD95A4DC902C",
   "pitch": -22.61,
   "yaw": -5.35,
   "hfov": 17.95,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_D2F533D4_C3F3_98E5_41DC_C06241682CEA",
 "maps": [
  {
   "hfov": 17.95,
   "yaw": -5.35,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_1_HS_0_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -22.61,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CF1013BA_C391_98A2_4167_0505D502E364, this.camera_82028297_8CB4_B83A_41C4_B1D61921E378); this.mainPlayList.set('selectedIndex', 5)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 01"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EEA85515_C634_79C3_41E0_6091C7CEDAF8",
   "pitch": -45.01,
   "yaw": -82.58,
   "hfov": 8.09,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_D20E5953_C3F1_89E3_41E2_DE390783024A",
 "maps": [
  {
   "hfov": 8.09,
   "yaw": -82.58,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_1_HS_1_0_0_map.gif",
      "width": 17,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -45.01,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A, this.camera_8212428E_8CB4_B82A_4183_542CC2D53DAB); this.mainPlayList.set('selectedIndex', 12)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.85,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_1_HS_2_0.png",
      "width": 150,
      "height": 150,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 3.3,
   "yaw": 35.46
  }
 ],
 "id": "overlay_D181A890_C3F0_977D_41E6_810868AFA24B",
 "maps": [
  {
   "hfov": 10.85,
   "yaw": 35.46,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_1_HS_2_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 3.3,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5, this.camera_80D6137C_8CB4_B8EE_41C8_B9B4B230719F); this.mainPlayList.set('selectedIndex', 24)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 01a"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EE93D51E_C634_79C1_4199_FCDDF2FE4CA6",
   "pitch": -51.06,
   "yaw": 75.99,
   "hfov": 12.22,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_D55AF350_C65C_5841_41E8_2583A752FBE8",
 "maps": [
  {
   "hfov": 12.22,
   "yaw": 75.99,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9_1_HS_0_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -51.06,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_11B27642_004A_EB3A_4142_7CBC8EFC0A22, this.camera_80D1E384_8CB4_B81E_4195_FEE5BBFD9A5C); this.mainPlayList.set('selectedIndex', 26)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.86,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9_1_HS_2_0.png",
      "width": 151,
      "height": 151,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 2.84,
   "yaw": 118.11
  }
 ],
 "id": "overlay_1788E5E3_0609_A636_4170_98106BB92308",
 "maps": [
  {
   "hfov": 10.86,
   "yaw": 118.11,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9_1_HS_2_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 2.84,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40, this.camera_83C9F07A_8CB4_B8EB_41B3_B3946C9F7772); this.mainPlayList.set('selectedIndex', 10)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 01a"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EE960517_C634_79CE_41A3_AD59E10D5AB0",
   "pitch": -34.59,
   "yaw": -21.06,
   "hfov": 11.71,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_D0840BD8_C3F0_88ED_41D5_401F4C1D0F9A",
 "maps": [
  {
   "hfov": 11.71,
   "yaw": -21.06,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_1_HS_0_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -34.59,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3E6FB4EF_32E5_BD87_4187_4E27487A5391, this.camera_83D95071_8CB4_B8F9_41DE_C8B7CC983057); this.mainPlayList.set('selectedIndex', 1)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 22.95,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_1_HS_1_0.png",
      "width": 318,
      "height": 349,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -0.47,
   "yaw": -146.66
  }
 ],
 "id": "overlay_D0C5DA7D_C3F1_8BA7_41D0_40EE562498C3",
 "maps": [
  {
   "hfov": 22.95,
   "yaw": -146.66,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_1_HS_1_0_0_map.gif",
      "width": 16,
      "height": 17,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -0.47,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3FF204B8_32AD_FD8A_41C8_A348279F77D9, this.camera_81B9D415_8CB4_B83E_41E0_3204E1746F3E); this.mainPlayList.set('selectedIndex', 31)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 17.33,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3CDB8152_32AC_549E_41C0_2EA6C9801032_1_HS_0_0.png",
      "width": 289,
      "height": 268,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 2.82,
   "yaw": -170.07
  }
 ],
 "id": "overlay_2D68C2F0_336C_759A_41C7_B9B641CD3CD0",
 "maps": [
  {
   "hfov": 17.33,
   "yaw": -170.07,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3CDB8152_32AC_549E_41C0_2EA6C9801032_1_HS_0_0_0_map.gif",
      "width": 17,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 2.82,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3E3ACD8A_32AC_AF89_41C5_288091B6AF29, this.camera_818FD17E_8CB4_B8EA_41CD_10B22C70A1D5); this.mainPlayList.set('selectedIndex', 34)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 16.56,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_1_HS_0_0.png",
      "width": 231,
      "height": 246,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 5.63,
   "yaw": 151.46
  }
 ],
 "id": "overlay_DC0C8682_C673_D8C1_41C9_3F738D8FB7A5",
 "maps": [
  {
   "hfov": 16.56,
   "yaw": 151.46,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_1_HS_0_0_0_map.gif",
      "width": 16,
      "height": 17,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 5.63,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6, this.camera_819FA175_8CB4_B8F9_41D7_AA9A27CCB522); this.mainPlayList.set('selectedIndex', 43)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 01a"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EE9BB528_C634_79C1_41B3_1F353BE8FDD6",
   "pitch": -31.4,
   "yaw": 34.74,
   "hfov": 16.59,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_DC8E5D89_C64C_48C3_41D0_5E147F703183",
 "maps": [
  {
   "hfov": 16.59,
   "yaw": 34.74,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_1_HS_1_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -31.4,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3E3FB1E6_32A7_D786_41C1_CD16D7C1F309, this.camera_807273DE_8CB4_B82A_41B1_6E074B2033B1); this.mainPlayList.set('selectedIndex', 46)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 15.84,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E181019_32A4_748A_41C7_D30403307065_1_HS_0_0.png",
      "width": 264,
      "height": 276,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 1.81,
   "yaw": -169.82
  }
 ],
 "id": "overlay_15B510C7_3364_7586_41C2_C6620CFBA961",
 "maps": [
  {
   "hfov": 15.84,
   "yaw": -169.82,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E181019_32A4_748A_41C7_D30403307065_1_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 1.81,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590, this.camera_80DB538B_8CB4_B82A_41E1_8DE0636E35C1); this.mainPlayList.set('selectedIndex', 21)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 9.06,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F79A584_32AC_5C7A_419D_E5B5EC2463D0_1_HS_0_0.png",
      "width": 151,
      "height": 151,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -0.2,
   "yaw": -124.47
  }
 ],
 "id": "overlay_2174C738_32AC_DC8A_41C2_89736F4D71A4",
 "maps": [
  {
   "hfov": 9.06,
   "yaw": -124.47,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F79A584_32AC_5C7A_419D_E5B5EC2463D0_1_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -0.2,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3F570BCA_32AC_AB8E_418D_9A4B6CEEBAEF, this.camera_80C4B393_8CB4_B83A_41C7_D42E89E8F457); this.mainPlayList.set('selectedIndex', 15)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 01a"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_2C4AFA97_3DB9_B15E_41BC_F3A210220C09",
   "pitch": -25.79,
   "yaw": 151.67,
   "hfov": 14.59,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_210F8527_32AD_FC86_41C4_BB25D69B9971",
 "maps": [
  {
   "hfov": 14.59,
   "yaw": 151.67,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F79A584_32AC_5C7A_419D_E5B5EC2463D0_1_HS_1_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -25.79,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5, this.camera_80CE339B_8CB4_B829_41D5_3539D07CE540); this.mainPlayList.set('selectedIndex', 24)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 01 Left"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_2C4B5A97_3DB9_B15E_41A5_9E8AEC926BE5",
   "pitch": 0.31,
   "yaw": 133.78,
   "hfov": 7.54,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_26DF65B2_32AC_BF99_41C5_7D48F8DCF9AE",
 "maps": [
  {
   "hfov": 7.54,
   "yaw": 133.78,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F79A584_32AC_5C7A_419D_E5B5EC2463D0_1_HS_2_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 0.31,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3E62E564_32A4_DCB9_41BD_32CA02213B87, this.camera_80CB13A4_8CB4_B81E_41DE_042FB48B1D5B); this.mainPlayList.set('selectedIndex', 17)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 9.06,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F79A584_32AC_5C7A_419D_E5B5EC2463D0_1_HS_3_0.png",
      "width": 151,
      "height": 151,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 1.06,
   "yaw": -5.64
  }
 ],
 "id": "overlay_26B64558_32A4_5C89_41C8_3CAB3D877518",
 "maps": [
  {
   "hfov": 9.06,
   "yaw": -5.64,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F79A584_32AC_5C7A_419D_E5B5EC2463D0_1_HS_3_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 1.06,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A, this.camera_83D63067_8CB4_B81A_41DD_97F69DA6F174); this.mainPlayList.set('selectedIndex', 55)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 17.85,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_118A5E95_004A_FB5E_414F_25F73E14E9E4_1_HS_0_0.png",
      "width": 297,
      "height": 226,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -1.2,
   "yaw": -131.63
  }
 ],
 "id": "overlay_1BA8B30A_004F_694A_4158_016311CE43BA",
 "maps": [
  {
   "hfov": 17.85,
   "yaw": -131.63,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_118A5E95_004A_FB5E_414F_25F73E14E9E4_1_HS_0_0_0_map.gif",
      "width": 21,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -1.2,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3E6FB4EF_32E5_BD87_4187_4E27487A5391, this.camera_8012A127_8CB4_B819_41DB_DDD42FFB656E); this.mainPlayList.set('selectedIndex', 1)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.85,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_1_HS_0_0.png",
      "width": 150,
      "height": 150,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 3.3,
   "yaw": -158.37
  }
 ],
 "id": "overlay_D0FEC682_C3F1_BB62_41D4_9102F3B6D6C5",
 "maps": [
  {
   "hfov": 10.85,
   "yaw": -158.37,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_1_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 3.3,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23, this.camera_803B2117_8CB4_B839_41D7_5F9B11D083FA); this.mainPlayList.set('selectedIndex', 7)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 01a"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EE96A517_C634_79CF_41BB_38AC08D7DC61",
   "pitch": -36.82,
   "yaw": 35.42,
   "hfov": 12.93,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_D09F0370_C3F0_99BE_41E4_9F144A073A5D",
 "maps": [
  {
   "hfov": 12.93,
   "yaw": 35.42,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_1_HS_1_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -36.82,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_0B55BDE4_0039_38FE_4139_E851DEBF7C58, this.camera_802F111F_8CB4_B829_41E0_6E60454175BE); this.mainPlayList.set('selectedIndex', 8)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 01 Right"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_2C463A90_3DB9_B152_41CD_982BA9ED3EB4",
   "pitch": 2.2,
   "yaw": -115.31,
   "hfov": 13.81,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_20A85676_32A4_DC86_41C7_8BD7100CF053",
 "maps": [
  {
   "hfov": 13.81,
   "yaw": -115.31,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_1_HS_3_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 2.2,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3E6FB4EF_32E5_BD87_4187_4E27487A5391, this.camera_809110C4_8CB4_B81E_41DD_2880872F7B25); this.mainPlayList.set('selectedIndex', 1)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 15.05,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E50C840_32E4_74F9_41A4_4EC4173FA3A2_1_HS_0_0.png",
      "width": 251,
      "height": 305,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 4.2,
   "yaw": -161.4
  }
 ],
 "id": "overlay_2098B134_32A4_5499_41C2_22F48477A3BD",
 "maps": [
  {
   "hfov": 15.05,
   "yaw": -161.4,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E50C840_32E4_74F9_41A4_4EC4173FA3A2_1_HS_0_0_0_map.gif",
      "width": 16,
      "height": 19,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 4.2,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 4)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 01a"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_2C41EA8E_3DB9_B14E_41C6_68A7E2972DDF",
   "pitch": -20.79,
   "yaw": 5.32,
   "hfov": 11.13,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_3C2492B0_32BC_759A_41B7_72D9BCA27205",
 "maps": [
  {
   "hfov": 11.13,
   "yaw": 5.32,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E51A3EA_329B_DB8E_41B3_D516BBB498CC_1_HS_0_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -20.79,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3E6FB4EF_32E5_BD87_4187_4E27487A5391, this.camera_803343AE_8CB4_B86A_41C9_5316C31CEB06); this.mainPlayList.set('selectedIndex', 1)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 01a"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_2C42CA8E_3DB9_B14E_41C7_7960FB9BF9F2",
   "pitch": -34.73,
   "yaw": 127.04,
   "hfov": 15.77,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_3DF1309D_32BD_B58A_41C4_D85A3ACB0676",
 "maps": [
  {
   "hfov": 15.77,
   "yaw": 127.04,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E51A3EA_329B_DB8E_41B3_D516BBB498CC_1_HS_1_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -34.73,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 3)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 9.62,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E51A3EA_329B_DB8E_41B3_D516BBB498CC_1_HS_2_0.png",
      "width": 133,
      "height": 161,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 0.53,
   "yaw": -56.36
  }
 ],
 "id": "overlay_3D3AD041_32BF_F4FA_41C5_3331BDC2E822",
 "maps": [
  {
   "hfov": 9.62,
   "yaw": -56.36,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E51A3EA_329B_DB8E_41B3_D516BBB498CC_1_HS_2_0_0_map.gif",
      "width": 16,
      "height": 19,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 0.53,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3E110129_32A4_548A_41A6_17FA339053A0, this.camera_829E6213_8CB4_B83A_41AE_CB9E592E5F9C); this.mainPlayList.set('selectedIndex', 45)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 14.69,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0F2964AA_0199_39D8_415C_DAB75F704D09_1_HS_0_0.png",
      "width": 244,
      "height": 290,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 0.29,
   "yaw": 107.93
  }
 ],
 "id": "overlay_12B3B3CD_01A9_1F58_4175_0448822DFE99",
 "maps": [
  {
   "hfov": 14.69,
   "yaw": 107.93,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0F2964AA_0199_39D8_415C_DAB75F704D09_1_HS_0_0_0_map.gif",
      "width": 16,
      "height": 19,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 0.29,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4, this.camera_801283C6_8CB4_B81A_41D6_AEC7C3BC4219); this.mainPlayList.set('selectedIndex', 13)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 14.59,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0C72BAA0_0039_5B76_4145_C1EF94F793A0_1_HS_0_0.png",
      "width": 243,
      "height": 238,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 0.43,
   "yaw": 60.43
  }
 ],
 "id": "overlay_117BAD49_0079_5936_4155_38DBB5BBB748",
 "maps": [
  {
   "hfov": 14.59,
   "yaw": 60.43,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0C72BAA0_0039_5B76_4145_C1EF94F793A0_1_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 0.43,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7, this.camera_83E6D2F7_8CB4_B9F9_41D4_F84CBE9F2C02); this.mainPlayList.set('selectedIndex', 27)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 01a"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EE902520_C634_79C1_41BF_257FBF304234",
   "pitch": -32.15,
   "yaw": -54.9,
   "hfov": 16.46,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_D25D23DA_C655_D841_41D7_0482A8407978",
 "maps": [
  {
   "hfov": 16.46,
   "yaw": -54.9,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D_1_HS_0_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -32.15,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_136FCF41_004A_D936_4151_FFADF2CFBA26, this.camera_83E89300_8CB4_B817_41CA_1EC2AABFEDF2); this.mainPlayList.set('selectedIndex', 29)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.84,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D_1_HS_2_0.png",
      "width": 151,
      "height": 151,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 4.17,
   "yaw": -94.17
  }
 ],
 "id": "overlay_141820D1_0608_DE13_4184_3BBBDEF95731",
 "maps": [
  {
   "hfov": 10.84,
   "yaw": -94.17,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D_1_HS_2_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 4.17,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_E609D5D6_C65C_5841_41DC_4408506ECD34, this.camera_8135D1A6_8CB4_B81A_41D5_B17DA644CF46); this.mainPlayList.set('selectedIndex', 50)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 01"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_2FA12AAC_3DB9_B173_41CA_1090258E1658",
   "pitch": -44.91,
   "yaw": -81.35,
   "hfov": 12.69,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1A0C0FA4_3365_ABB9_41C4_642D3FFA3681",
 "maps": [
  {
   "hfov": 12.69,
   "yaw": -81.35,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E24D2BF_32A4_D587_4192_FCC0A640BC00_1_HS_0_0_0_map.gif",
      "width": 17,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -44.91,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0, this.camera_81C5E19E_8CB4_B82A_41D6_181B31AD321E); this.mainPlayList.set('selectedIndex', 57)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.87,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E24D2BF_32A4_D587_4192_FCC0A640BC00_1_HS_1_0.png",
      "width": 151,
      "height": 151,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -0.35,
   "yaw": 34.45
  }
 ],
 "id": "overlay_19595136_3364_B486_41B2_AB314BF8E1F9",
 "maps": [
  {
   "hfov": 10.87,
   "yaw": 34.45,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E24D2BF_32A4_D587_4192_FCC0A640BC00_1_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -0.35,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3E110129_32A4_548A_41A6_17FA339053A0, this.camera_81D2C196_8CB4_B83A_41D8_C3B526E6DCD3); this.mainPlayList.set('selectedIndex', 45)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 01a"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_2FA22AAC_3DB9_B173_41B9_E241420779C1",
   "pitch": -22.8,
   "yaw": -3.22,
   "hfov": 13.75,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1A9011A8_3364_5789_41C4_B319C08CED6A",
 "maps": [
  {
   "hfov": 13.75,
   "yaw": -3.22,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E24D2BF_32A4_D587_4192_FCC0A640BC00_1_HS_2_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -22.8,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068, this.camera_8006312E_8CB4_B86B_41DD_5646D8ED00A8); this.mainPlayList.set('selectedIndex', 51)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 14.55,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_118D55D0_004A_E8D6_412B_F15016B43EC0_1_HS_0_0.png",
      "width": 243,
      "height": 222,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -4.34,
   "yaw": -3.63
  }
 ],
 "id": "overlay_1AF1323F_0049_6B4A_4158_18971B8C0B2E",
 "maps": [
  {
   "hfov": 14.55,
   "yaw": -3.63,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_118D55D0_004A_E8D6_412B_F15016B43EC0_1_HS_0_0_0_map.gif",
      "width": 17,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -4.34,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3E24D2BF_32A4_D587_4192_FCC0A640BC00, this.camera_81D5744F_8CB4_B829_41CA_6E10B9A6626B); this.mainPlayList.set('selectedIndex', 49)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 01"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EE85753D_C634_79C3_41D0_D071D6C1482E",
   "pitch": -29.08,
   "yaw": 6.37,
   "hfov": 10,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_E2FE88E0_C64D_C841_41C3_2E195A899599",
 "maps": [
  {
   "hfov": 10,
   "yaw": 6.37,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E609D5D6_C65C_5841_41DC_4408506ECD34_1_HS_0_0_0_map.gif",
      "width": 17,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -29.08,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 12)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 12.79,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_118B7384_0049_E93E_4136_7E71C475A6E0_1_HS_0_0.png",
      "width": 213,
      "height": 205,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -4.59,
   "yaw": -4.26
  }
 ],
 "id": "overlay_17D9B17A_0059_69CA_412E_7A0DA76B62F0",
 "maps": [
  {
   "hfov": 12.79,
   "yaw": -4.26,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_118B7384_0049_E93E_4136_7E71C475A6E0_1_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -4.59,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40, this.camera_83859048_8CB4_B817_41C4_A98557DF6634); this.mainPlayList.set('selectedIndex', 10)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 13.33,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0B65F72F_0039_294A_413D_7167CFDDAD60_1_HS_0_0.png",
      "width": 222,
      "height": 184,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 0.05,
   "yaw": -130.12
  }
 ],
 "id": "overlay_1357338D_0077_294E_4147_F9D08C457157",
 "maps": [
  {
   "hfov": 13.33,
   "yaw": -130.12,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0B65F72F_0039_294A_413D_7167CFDDAD60_1_HS_0_0_0_map.gif",
      "width": 19,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 0.05,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C857B562_C391_99A2_41D4_622CFBF52C0A, this.camera_81B7F40A_8CB4_B82B_41C5_38F7BA5AA823); this.mainPlayList.set('selectedIndex', 4)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 01"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EEA93516_C634_79C1_41D5_E7DFC2676D36",
   "pitch": -30.32,
   "yaw": 4.72,
   "hfov": 9.87,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_D178C03E_C3F0_B7A5_41CB_0834EED7746E",
 "maps": [
  {
   "hfov": 9.87,
   "yaw": 4.72,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CF1013BA_C391_98A2_4167_0505D502E364_1_HS_0_0_0_map.gif",
      "width": 17,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -30.32,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3E51A3EA_329B_DB8E_41B3_D516BBB498CC, this.camera_819C0429_8CB4_B869_41E0_CA1614569CD1); this.mainPlayList.set('selectedIndex', 0)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 01a"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_2C434A8E_3DB9_B14E_41C4_C729FF1A72EF",
   "pitch": -38.35,
   "yaw": 141.88,
   "hfov": 12.7,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_3D7349BD_32BC_778A_4180_C573C2C75FFB",
 "maps": [
  {
   "hfov": 12.7,
   "yaw": 141.88,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E6FB4EF_32E5_BD87_4187_4E27487A5391_1_HS_0_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -38.35,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9, this.camera_81AAC41F_8CB4_B829_41D2_F2972A3AD01D); this.mainPlayList.set('selectedIndex', 9)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 01 Left"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_2C43AA8F_3DB9_B14E_41C2_94FF47C7E6F2",
   "pitch": 0.82,
   "yaw": 134.28,
   "hfov": 7.54,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_233B548B_32BC_5D8E_41C7_F55DAF5829C6",
 "maps": [
  {
   "hfov": 7.54,
   "yaw": 134.28,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E6FB4EF_32E5_BD87_4187_4E27487A5391_1_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 0.82,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5, this.camera_81F1F43C_8CB4_B86F_41C2_4ED783E80D07); this.mainPlayList.set('selectedIndex', 6)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 9.06,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E6FB4EF_32E5_BD87_4187_4E27487A5391_1_HS_2_0.png",
      "width": 151,
      "height": 151,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 0.31,
   "yaw": -125.23
  }
 ],
 "id": "overlay_20FA1B8A_32BD_AB8E_41C8_0F7543612339",
 "maps": [
  {
   "hfov": 9.06,
   "yaw": -125.23,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E6FB4EF_32E5_BD87_4187_4E27487A5391_1_HS_2_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 0.31,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3E50C840_32E4_74F9_41A4_4EC4173FA3A2, this.camera_818E8433_8CB4_B87A_41D9_FE42E21833BB); this.mainPlayList.set('selectedIndex', 2)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 9.06,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E6FB4EF_32E5_BD87_4187_4E27487A5391_1_HS_3_0.png",
      "width": 151,
      "height": 151,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 0.81,
   "yaw": -6.65
  }
 ],
 "id": "overlay_23D0DBA5_32BC_EBBA_41C1_E474DF25AAC3",
 "maps": [
  {
   "hfov": 9.06,
   "yaw": -6.65,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E6FB4EF_32E5_BD87_4187_4E27487A5391_1_HS_3_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 0.81,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3FE2707B_32AC_B48E_41C6_A7FCAE50A2B6, this.camera_83A612CF_8CB4_B82A_41A0_4C927A53890A); this.mainPlayList.set('selectedIndex', 30)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 01a"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_2FB45AA0_3DB9_B172_41B6_A14EE6CE31C0",
   "pitch": -24.03,
   "yaw": 148.66,
   "hfov": 14.8,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_281CFD8B_336C_EF8E_41BA_4EEEC4633EEB",
 "maps": [
  {
   "hfov": 14.8,
   "yaw": 148.66,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FF204B8_32AD_FD8A_41C8_A348279F77D9_1_HS_0_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -24.03,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0, this.camera_824732BC_8CB4_B86F_41E0_840A5132F419); this.mainPlayList.set('selectedIndex', 39)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 01 Left"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_2FB4AAA0_3DB9_B172_41C2_22EC070ED84F",
   "pitch": 1.07,
   "yaw": 135.28,
   "hfov": 7.54,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_28913488_336F_DD8A_41A6_A79938E14234",
 "maps": [
  {
   "hfov": 7.54,
   "yaw": 135.28,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FF204B8_32AD_FD8A_41C8_A348279F77D9_1_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 1.07,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A, this.camera_83B4D2C5_8CB4_B81E_41D2_2A349C3F89EE); this.mainPlayList.set('selectedIndex', 36)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 9.06,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FF204B8_32AD_FD8A_41C8_A348279F77D9_1_HS_2_0.png",
      "width": 151,
      "height": 151,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 0.31,
   "yaw": -125.48
  }
 ],
 "id": "overlay_2F1676EF_336C_5D86_41B8_D7D223FBE696",
 "maps": [
  {
   "hfov": 9.06,
   "yaw": -125.48,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FF204B8_32AD_FD8A_41C8_A348279F77D9_1_HS_2_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 0.31,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3CDB8152_32AC_549E_41C0_2EA6C9801032, this.camera_8255B2B3_8CB4_B87A_41E0_01927A9FFFFD); this.mainPlayList.set('selectedIndex', 32)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 11.57,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FF204B8_32AD_FD8A_41C8_A348279F77D9_1_HS_3_0.png",
      "width": 192,
      "height": 197,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -0.32,
   "yaw": -4.14
  }
 ],
 "id": "overlay_2F94ADDA_336C_6F89_41B3_E166F691B2DD",
 "maps": [
  {
   "hfov": 11.57,
   "yaw": -4.14,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FF204B8_32AD_FD8A_41C8_A348279F77D9_1_HS_3_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -0.32,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0, this.camera_833B531D_8CB4_B82E_41D7_3D5A85C44BAF); this.mainPlayList.set('selectedIndex', 39)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 01a"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EE9AE527_C634_79CF_41CB_542FF5E39B28",
   "pitch": -53.53,
   "yaw": 88.07,
   "hfov": 11.55,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_DFA742CC_C674_3841_419D_AB7849550207",
 "maps": [
  {
   "hfov": 11.55,
   "yaw": 88.07,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5_1_HS_0_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -53.53,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_11906CBC_0049_DF4E_411B_4127E5D5F480, this.camera_832B1327_8CB4_B81A_4197_3917F25E3E24); this.mainPlayList.set('selectedIndex', 41)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.87,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5_1_HS_2_0.png",
      "width": 151,
      "height": 151,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -0.18,
   "yaw": 117.1
  }
 ],
 "id": "overlay_14AA83F7_0608_A21E_4189_B52BDB95135B",
 "maps": [
  {
   "hfov": 10.87,
   "yaw": 117.1,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5_1_HS_2_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -0.18,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3E3FB1E6_32A7_D786_41C1_CD16D7C1F309, this.camera_8127F1AE_8CB4_B86A_41B9_504585CBD36C); this.mainPlayList.set('selectedIndex', 46)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 18.01,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_1_HS_0_0.png",
      "width": 250,
      "height": 261,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 1.24,
   "yaw": -157.54
  }
 ],
 "id": "overlay_E6C34BC9_C65D_C843_41E3_37D707F31C56",
 "maps": [
  {
   "hfov": 18.01,
   "yaw": -157.54,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_1_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 1.24,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D, this.camera_811641B6_8CB4_B87A_41D6_F0855D41950C); this.mainPlayList.set('selectedIndex', 52)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 01a"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EE868537_C634_79CF_41DE_C101E360270A",
   "pitch": -38.4,
   "yaw": 37.55,
   "hfov": 15.24,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_E7577260_C65C_7843_41E0_F5DDAEA8A5BD",
 "maps": [
  {
   "hfov": 15.24,
   "yaw": 37.55,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_1_HS_1_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -38.4,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_118D55D0_004A_E8D6_412B_F15016B43EC0, this.camera_811851BE_8CB4_B86A_41B1_C3CEC6976550); this.mainPlayList.set('selectedIndex', 53)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 01 Right"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_2FA43AAD_3DB9_B14D_41C1_0E3BC4AE01C1",
   "pitch": -0.44,
   "yaw": -115.94,
   "hfov": 7.54,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_18DE8DB9_336C_6F8A_41BD_1994DC6F4A21",
 "maps": [
  {
   "hfov": 7.54,
   "yaw": -115.94,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_1_HS_3_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -0.44,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590, this.camera_806643E6_8CB4_B81A_41AE_CA0E4AB16B2E); this.mainPlayList.set('selectedIndex', 21)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 01a"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EE92251D_C634_79C3_41D0_BCD536C9B445",
   "pitch": -33.44,
   "yaw": -61.42,
   "hfov": 13.24,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_D4424B68_C654_C841_41AA_04E4BDB57422",
 "maps": [
  {
   "hfov": 13.24,
   "yaw": -61.42,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2_1_HS_0_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -33.44,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA, this.camera_82239284_8CB4_B81E_41D0_2DED2E537A12); this.mainPlayList.set('selectedIndex', 58)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 01a"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EE84253B_C634_79C7_41E0_968E01AFCA33",
   "pitch": -30.71,
   "yaw": 37.62,
   "hfov": 16.71,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_E54E0653_C654_5847_41E2_4F2F79E153AD",
 "maps": [
  {
   "hfov": 16.71,
   "yaw": 37.62,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_1_HS_0_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -30.71,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3E24D2BF_32A4_D587_4192_FCC0A640BC00, this.camera_8233F274_8CB4_B8FE_41AB_D70D97FCE8E7); this.mainPlayList.set('selectedIndex', 49)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 16.9,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_1_HS_1_0.png",
      "width": 234,
      "height": 208,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 2.34,
   "yaw": 152.97
  }
 ],
 "id": "overlay_E5F8F5BF_C654_583F_41E0_5A5263ACE886",
 "maps": [
  {
   "hfov": 16.9,
   "yaw": 152.97,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_1_HS_1_0_0_map.gif",
      "width": 18,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 2.34,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5, this.camera_806C13EE_8CB4_BFEA_41E0_D21D3F15A58B); this.mainPlayList.set('selectedIndex', 40)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.82,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_11906CBC_0049_DF4E_411B_4127E5D5F480_1_HS_0_0.png",
      "width": 180,
      "height": 171,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 0.93,
   "yaw": -131.63
  }
 ],
 "id": "overlay_18E3C57F_0057_29CA_4147_F4600E232D3B",
 "maps": [
  {
   "hfov": 10.82,
   "yaw": -131.63,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_11906CBC_0049_DF4E_411B_4127E5D5F480_1_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 0.93,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B, this.camera_83C99313_8CB4_B839_41E0_EF7CA675725E); this.mainPlayList.set('selectedIndex', 42)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 01a"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EE9B3529_C634_79C3_41E2_6373077866CD",
   "pitch": -33.46,
   "yaw": -49.75,
   "hfov": 16.22,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_DDE3106F_C64C_D85F_41C3_782CF613010E",
 "maps": [
  {
   "hfov": 16.22,
   "yaw": -49.75,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6_1_HS_0_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -33.46,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_135DA583_0049_293A_414E_3C25985D46CB, this.camera_83D9C30A_8CB4_B82B_41D6_E23F2D92E5F1); this.mainPlayList.set('selectedIndex', 44)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.37,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6_1_HS_2_0.png",
      "width": 144,
      "height": 144,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -0.85,
   "yaw": -93.92
  }
 ],
 "id": "overlay_15CEF500_0608_67F2_415C_6AB7E6A6DB80",
 "maps": [
  {
   "hfov": 10.37,
   "yaw": -93.92,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6_1_HS_2_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -0.85,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6, this.camera_81E33446_8CB4_B81B_41D1_9EA5A2B6DE1E); this.mainPlayList.set('selectedIndex', 43)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 15.59,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_135DA583_0049_293A_414E_3C25985D46CB_1_HS_0_0.png",
      "width": 259,
      "height": 238,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -0.82,
   "yaw": 59.92
  }
 ],
 "id": "overlay_19FC6A44_0049_7B3E_4152_6EC2AFFF8366",
 "maps": [
  {
   "hfov": 15.59,
   "yaw": 59.92,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_135DA583_0049_293A_414E_3C25985D46CB_1_HS_0_0_0_map.gif",
      "width": 17,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -0.82,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A, this.camera_82AEB205_8CB4_B81E_41D0_D9A1A2C93F1F); this.mainPlayList.set('selectedIndex', 36)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 01a"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EE9D8526_C634_79C1_41D1_BFDADEF90055",
   "pitch": -39.22,
   "yaw": -65.68,
   "hfov": 11.23,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_DEEEAE21_C674_CBC3_41DF_981A8131049C",
 "maps": [
  {
   "hfov": 11.23,
   "yaw": -65.68,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5_1_HS_0_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -39.22,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068, this.camera_82E15241_8CB4_B819_41B1_5FE9F086FD9A); this.mainPlayList.set('selectedIndex', 51)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 9.06,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E3FB1E6_32A7_D786_41C1_CD16D7C1F309_1_HS_0_0.png",
      "width": 151,
      "height": 151,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -0.2,
   "yaw": -125.73
  }
 ],
 "id": "overlay_171BF5A2_337C_5FBE_41C1_1CFC8A15F9B7",
 "maps": [
  {
   "hfov": 9.06,
   "yaw": -125.73,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E3FB1E6_32A7_D786_41C1_CD16D7C1F309_1_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -0.2,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3E181019_32A4_748A_41C7_D30403307065, this.camera_82D0E255_8CB4_B839_41D7_37D3AC8E95D2); this.mainPlayList.set('selectedIndex', 47)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 9.05,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E3FB1E6_32A7_D786_41C1_CD16D7C1F309_1_HS_1_0.png",
      "width": 151,
      "height": 151,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -1.95,
   "yaw": -4.64
  }
 ],
 "id": "overlay_1612DDE0_337D_AFBA_41AB_8C2FFC9AF43D",
 "maps": [
  {
   "hfov": 9.05,
   "yaw": -4.64,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E3FB1E6_32A7_D786_41C1_CD16D7C1F309_1_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -1.95,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3E110129_32A4_548A_41A6_17FA339053A0, this.camera_82F19233_8CB4_B879_41B2_DD98B098CBFF); this.mainPlayList.set('selectedIndex', 45)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 01a"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_2FA0DAA6_3DB9_B17E_41C2_D89D0A71AECE",
   "pitch": -27.8,
   "yaw": 155.44,
   "hfov": 14.33,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_16441BF7_3364_6B86_41C2_FCE0607B865B",
 "maps": [
  {
   "hfov": 14.33,
   "yaw": 155.44,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E3FB1E6_32A7_D786_41C1_CD16D7C1F309_1_HS_2_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -27.8,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A, this.camera_82C0B264_8CB4_B81E_41B9_4861888E9A6A); this.mainPlayList.set('selectedIndex', 54)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 01 Left"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_2FA12AAB_3DB9_B175_41A2_275777BD00C9",
   "pitch": 1.82,
   "yaw": 133.52,
   "hfov": 7.53,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_16AA1020_3364_D4BA_41BC_B44D16D56E0B",
 "maps": [
  {
   "hfov": 7.53,
   "yaw": 133.52,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E3FB1E6_32A7_D786_41C1_CD16D7C1F309_1_HS_3_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 1.82,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9, this.camera_8051D3F7_8CB4_BFFA_41B7_267D96756AFE); this.mainPlayList.set('selectedIndex', 25)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 12.56,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_11B27642_004A_EB3A_4142_7CBC8EFC0A22_1_HS_0_0.png",
      "width": 209,
      "height": 234,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 3.32,
   "yaw": -130.75
  }
 ],
 "id": "overlay_1419C47C_0059_EFCE_4151_9254754CC460",
 "maps": [
  {
   "hfov": 12.56,
   "yaw": -130.75,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_11B27642_004A_EB3A_4142_7CBC8EFC0A22_1_HS_0_0_0_map.gif",
      "width": 16,
      "height": 17,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 3.32,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590, this.camera_80421401_8CB4_B816_41E0_5451D52E8FE2); this.mainPlayList.set('selectedIndex', 21)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 11.78,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_11AC3D3D_004A_F94E_4142_D27F9A1181D7_1_HS_0_0.png",
      "width": 197,
      "height": 209,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -4.72,
   "yaw": -5.52
  }
 ],
 "id": "overlay_146737F2_0057_E8DA_4155_00C91D7C48D2",
 "maps": [
  {
   "hfov": 11.78,
   "yaw": -5.52,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_11AC3D3D_004A_F94E_4142_D27F9A1181D7_1_HS_0_0_0_map.gif",
      "width": 15,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -4.72,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3F79A584_32AC_5C7A_419D_E5B5EC2463D0, this.camera_80D7F0F5_8CB4_B9F9_41A8_3302B3873582); this.mainPlayList.set('selectedIndex', 16)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 01a"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_2C499A96_3DB9_B15E_41C1_410A502395D1",
   "pitch": -31.97,
   "yaw": 125.78,
   "hfov": 9.89,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_209C93E9_32AC_5B8A_41B3_4E23C1D3F27C",
 "maps": [
  {
   "hfov": 9.89,
   "yaw": 125.78,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F570BCA_32AC_AB8E_418D_9A4B6CEEBAEF_1_HS_0_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -31.97,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_0EF390FE_019F_1938_4173_7E5BC178F7F6, this.camera_80DDE0FD_8CB4_B9E9_4160_5F391BDB868B); this.mainPlayList.set('selectedIndex', 18)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 8.1,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F570BCA_32AC_AB8E_418D_9A4B6CEEBAEF_1_HS_1_0.png",
      "width": 112,
      "height": 151,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 2.41,
   "yaw": -56.11
  }
 ],
 "id": "overlay_20487ACB_32AC_D58E_41C3_0FCD15BCFE67",
 "maps": [
  {
   "hfov": 8.1,
   "yaw": -56.11,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F570BCA_32AC_AB8E_418D_9A4B6CEEBAEF_1_HS_1_0_0_map.gif",
      "width": 16,
      "height": 21,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 2.41,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3E7EC44F_32AB_DC87_41C2_5748F1C76A53, this.camera_80E0A0ED_8CB4_B9E9_41BE_5C629173241E); this.mainPlayList.set('selectedIndex', 19)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 01a"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_2C4A2A96_3DB9_B15E_41CD_A54AFB76D8BA",
   "pitch": -18.9,
   "yaw": 6.71,
   "hfov": 11.5,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_21CEA0BD_32AF_F58A_41C6_02D8A6F2F8C3",
 "maps": [
  {
   "hfov": 11.5,
   "yaw": 6.71,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F570BCA_32AC_AB8E_418D_9A4B6CEEBAEF_1_HS_2_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -18.9,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 10)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 01a"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EE84853A_C634_79C1_41DD_0215F77B0541",
   "pitch": -51.06,
   "yaw": 84.77,
   "hfov": 12.22,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_E483FB4F_C654_C85F_41D6_EB69928269D3",
 "maps": [
  {
   "hfov": 12.22,
   "yaw": 84.77,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A_1_HS_0_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -51.06,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_118A5E95_004A_FB5E_414F_25F73E14E9E4, this.camera_802F43BE_8CB4_B86A_41C1_B05765809B7D); this.mainPlayList.set('selectedIndex', 56)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 11.12,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A_1_HS_2_0.png",
      "width": 154,
      "height": 161,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -0.55,
   "yaw": 117.73
  }
 ],
 "id": "overlay_15B8B6A2_0608_E231_4196_4E1A0E5B8274",
 "maps": [
  {
   "hfov": 11.12,
   "yaw": 117.73,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A_1_HS_2_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -0.55,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D, this.camera_8095B0BB_8CB4_B86A_41E0_CEA0F566D6CD); this.mainPlayList.set('selectedIndex', 28)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 13.83,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_136FCF41_004A_D936_4151_FFADF2CFBA26_1_HS_0_0.png",
      "width": 230,
      "height": 238,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 1.19,
   "yaw": 61.56
  }
 ],
 "id": "overlay_163A1A6F_005F_DBCA_4143_609D9385BACF",
 "maps": [
  {
   "hfov": 13.83,
   "yaw": 61.56,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_136FCF41_004A_D936_4151_FFADF2CFBA26_1_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 1.19,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3FE2707B_32AC_B48E_41C6_A7FCAE50A2B6, this.camera_800D9136_8CB4_B87B_41C2_B513666972AE); this.mainPlayList.set('selectedIndex', 30)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 18.26,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0E9BEAA3_0199_09C8_416E_D3D5D37321FD_1_HS_0_0.png",
      "width": 304,
      "height": 272,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 0.84,
   "yaw": 105.8
  }
 ],
 "id": "overlay_105CC9D2_01A7_0B48_4158_008E8092F603",
 "maps": [
  {
   "hfov": 18.26,
   "yaw": 105.8,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0E9BEAA3_0199_09C8_416E_D3D5D37321FD_1_HS_0_0_0_map.gif",
      "width": 17,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 0.84,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3F79A584_32AC_5C7A_419D_E5B5EC2463D0, this.camera_80FA10E4_8CB4_B81F_41D0_01D5566D3458); this.mainPlayList.set('selectedIndex', 16)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.83,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_1_HS_0_0.png",
      "width": 150,
      "height": 150,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 4.95,
   "yaw": -157.27
  }
 ],
 "id": "overlay_D7E43C95_C654_48C3_41D5_D441E8F4B5BE",
 "maps": [
  {
   "hfov": 10.83,
   "yaw": -157.27,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_1_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 4.95,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2, this.camera_808E00D4_8CB4_B83F_41D6_7AC83305A87C); this.mainPlayList.set('selectedIndex', 22)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 01a"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EE92B51D_C634_79C3_41E6_BF230F987FF4",
   "pitch": -34.76,
   "yaw": 33.02,
   "hfov": 11.91,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_D78C34B1_C654_58C3_41C3_A038E40060B3",
 "maps": [
  {
   "hfov": 11.91,
   "yaw": 33.02,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_1_HS_1_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -34.76,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_11AC3D3D_004A_F94E_4142_D27F9A1181D7, this.camera_80F720DC_8CB4_B82F_41DF_766B5CAB1A0A); this.mainPlayList.set('selectedIndex', 23)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 01 Right"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_2C4EAA98_3DB9_B152_41A7_DBCA9DDEC464",
   "pitch": -0.94,
   "yaw": -117.07,
   "hfov": 12.81,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_25020B30_329F_B499_41C0_7B8448BA652A",
 "maps": [
  {
   "hfov": 12.81,
   "yaw": -117.07,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_1_HS_3_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -0.94,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 19)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 01"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_2C4DBA98_3DB9_B152_41BD_396F8B422100",
   "pitch": -29.06,
   "yaw": 5.1,
   "hfov": 10,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_D6BEFA7F_C64C_483F_41C3_9F7466FB8F67",
 "maps": [
  {
   "hfov": 10,
   "yaw": 5.1,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA_1_HS_0_0_0_map.gif",
      "width": 17,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -29.06,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5, this.camera_8018B3CE_8CB4_B82A_4193_D2702F8511C0); this.mainPlayList.set('selectedIndex', 6)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 15.57,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0B55BDE4_0039_38FE_4139_E851DEBF7C58_1_HS_0_0.png",
      "width": 259,
      "height": 209,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -2.96,
   "yaw": -3.63
  }
 ],
 "id": "overlay_12802B79_0076_D9D6_40D5_A735950E3D00",
 "maps": [
  {
   "hfov": 15.57,
   "yaw": -3.63,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0B55BDE4_0039_38FE_4139_E851DEBF7C58_1_HS_0_0_0_map.gif",
      "width": 19,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -2.96,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3E7EC44F_32AB_DC87_41C2_5748F1C76A53, this.camera_8071513E_8CB4_B86B_419A_8500E13ED289); this.mainPlayList.set('selectedIndex', 19)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 16.09,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_1_HS_0_0.png",
      "width": 223,
      "height": 219,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 1.1,
   "yaw": 151.74
  }
 ],
 "id": "overlay_D52AF8AA_C65C_C8C1_41E1_368B77920405",
 "maps": [
  {
   "hfov": 16.09,
   "yaw": 151.74,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_1_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 1.1,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D, this.camera_80657146_8CB4_B81B_4184_47A73CB581AD); this.mainPlayList.set('selectedIndex', 28)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 01a"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EE90B51F_C634_79FF_41C5_A79C01C84446",
   "pitch": -29.41,
   "yaw": 43.8,
   "hfov": 16.94,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_D5F4BE96_C654_C8C1_41E5_91FDE5D191D9",
 "maps": [
  {
   "hfov": 16.94,
   "yaw": 43.8,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_1_HS_1_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -29.41,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068, this.camera_800C83D6_8CB4_B83A_41D3_A8F057A1CD09); this.mainPlayList.set('selectedIndex', 51)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 01a"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EE861538_C634_79C1_41E5_D5BEC86A2DD1",
   "pitch": -37.71,
   "yaw": -68.97,
   "hfov": 11.47,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_E7E37E24_C654_4BC2_41E1_8DC9EEC30B49",
 "maps": [
  {
   "hfov": 11.47,
   "yaw": -68.97,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D_1_HS_0_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -37.71,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3F79A584_32AC_5C7A_419D_E5B5EC2463D0, this.camera_8392B03E_8CB4_B86B_41B4_7206B6336725); this.mainPlayList.set('selectedIndex', 16)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 16.09,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E62E564_32A4_DCB9_41BD_32CA02213B87_1_HS_0_0.png",
      "width": 268,
      "height": 276,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 1.06,
   "yaw": -165.42
  }
 ],
 "id": "overlay_271AF4F3_32A4_7D9F_4183_723DC0E5E4C1",
 "maps": [
  {
   "hfov": 16.09,
   "yaw": -165.42,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E62E564_32A4_DCB9_41BD_32CA02213B87_1_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 1.06,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3F570BCA_32AC_AB8E_418D_9A4B6CEEBAEF, this.camera_80E0836B_8CB4_B8E9_41B9_F38AB7B47F52); this.mainPlayList.set('selectedIndex', 15)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 01a"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_2C4C9A97_3DB9_B15E_41B3_4248AAC9A304",
   "pitch": -22.04,
   "yaw": -5.48,
   "hfov": 11.96,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_27335F89_32A4_AB8A_41C1_9B84E0221C2D",
 "maps": [
  {
   "hfov": 11.96,
   "yaw": -5.48,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E7EC44F_32AB_DC87_41C2_5748F1C76A53_1_HS_0_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -22.04,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7, this.camera_80EAE374_8CB4_B8FE_41CA_6D488C0A1AD0); this.mainPlayList.set('selectedIndex', 27)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.87,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E7EC44F_32AB_DC87_41C2_5748F1C76A53_1_HS_1_0.png",
      "width": 151,
      "height": 151,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 1.41,
   "yaw": 35.46
  }
 ],
 "id": "overlay_24F6F26A_32A4_5489_41C4_EC701E187A22",
 "maps": [
  {
   "hfov": 10.87,
   "yaw": 35.46,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E7EC44F_32AB_DC87_41C2_5748F1C76A53_1_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 1.41,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 35)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 01"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_2C4D5A97_3DB9_B15E_41C9_074D423004C5",
   "pitch": -45.16,
   "yaw": -80.98,
   "hfov": 11.04,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_243CA586_32A4_7C79_4170_A5E3FF8D61C7",
 "maps": [
  {
   "hfov": 11.04,
   "yaw": -80.98,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E7EC44F_32AB_DC87_41C2_5748F1C76A53_1_HS_2_0_0_map.gif",
      "width": 17,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -45.16,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A, this.camera_8272B2A0_8CB4_B817_41DD_2B18E9DE8F7F); this.mainPlayList.set('selectedIndex', 12)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 01a"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EE94B519_C634_79C3_41E2_987DBE2A3C20",
   "pitch": -32.43,
   "yaw": -50.85,
   "hfov": 16.41,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_D7296732_C3F0_99BD_41CD_15546F96B28A",
 "maps": [
  {
   "hfov": 16.41,
   "yaw": -50.85,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4_1_HS_0_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -32.43,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_0C72BAA0_0039_5B76_4145_C1EF94F793A0, this.camera_8265D2AA_8CB4_B86A_41C0_3B733AEC387A); this.mainPlayList.set('selectedIndex', 14)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 9.11,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4_1_HS_2_0.png",
      "width": 126,
      "height": 137,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 1.91,
   "yaw": -93.55
  }
 ],
 "id": "overlay_1497DBE8_0678_E232_4180_BC51F5A3B938",
 "maps": [
  {
   "hfov": 9.11,
   "yaw": -93.55,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4_1_HS_2_0_0_map.gif",
      "width": 16,
      "height": 17,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 1.91,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "id": "AnimatedImageResource_EE9D7527_C634_79CF_41D8_0EE7C8EAC465",
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_1_HS_1_0.png",
   "width": 1080,
   "height": 750,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "id": "AnimatedImageResource_2FBE7AA4_3DB9_B172_41A8_CCD591077E0E",
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_3E110129_32A4_548A_41A6_17FA339053A0_1_HS_0_0.png",
   "width": 1080,
   "height": 750,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "id": "AnimatedImageResource_2FBF4AA5_3DB9_B172_41C3_E5ED237F8206",
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_3E110129_32A4_548A_41A6_17FA339053A0_1_HS_2_0.png",
   "width": 1080,
   "height": 750,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "id": "AnimatedImageResource_EE96F517_C634_79CF_41DD_B98B1CDAC4EF",
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23_1_HS_0_0.png",
   "width": 1080,
   "height": 750,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "id": "AnimatedImageResource_EE93A51E_C634_79C1_41E1_1FE79DE4D4E8",
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_1_HS_1_0.png",
   "width": 1080,
   "height": 750,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "id": "AnimatedImageResource_EE85E53C_C634_79C1_41DB_7F3562B22FD2",
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA_1_HS_0_0.png",
   "width": 1080,
   "height": 750,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "id": "AnimatedImageResource_EE973518_C634_79C1_41B1_D4F6FE4DD0CE",
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_1_HS_0_0.png",
   "width": 1080,
   "height": 750,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "id": "AnimatedImageResource_2FB30A9A_3DB9_B156_4187_5826CFA6BB9D",
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_3FE2707B_32AC_B48E_41C6_A7FCAE50A2B6_1_HS_0_0.png",
   "width": 1080,
   "height": 750,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "id": "AnimatedImageResource_2FB3CA9A_3DB9_B156_41C8_783D55DDF941",
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_3FE2707B_32AC_B48E_41C6_A7FCAE50A2B6_1_HS_2_0.png",
   "width": 1080,
   "height": 750,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "id": "AnimatedImageResource_EE9F5524_C634_79C1_4151_C56E80BD365E",
 "frameDuration": 62,
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameCount": 9,
 "levels": [
  {
   "url": "media/panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9_1_HS_0_0.png",
   "width": 300,
   "height": 270,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "id": "AnimatedImageResource_2FB6BAA1_3DB9_B172_41BF_431C931B8E55",
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_3E3ACD8A_32AC_AF89_41C5_288091B6AF29_1_HS_0_0.png",
   "width": 1080,
   "height": 750,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "id": "AnimatedImageResource_2FB79AA1_3DB9_B172_41B5_E3EC438149A5",
 "frameDuration": 62,
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameCount": 9,
 "levels": [
  {
   "url": "media/panorama_3E3ACD8A_32AC_AF89_41C5_288091B6AF29_1_HS_2_0.png",
   "width": 300,
   "height": 270,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "id": "AnimatedImageResource_EE9C0525_C634_79C3_41E5_176E60E12F40",
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_1_HS_1_0.png",
   "width": 1080,
   "height": 750,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "id": "AnimatedImageResource_2FB92AA2_3DB9_B176_4196_9249EBB0A1F4",
 "frameDuration": 62,
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameCount": 9,
 "levels": [
  {
   "url": "media/panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_1_HS_3_0.png",
   "width": 300,
   "height": 300,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "id": "AnimatedImageResource_EE978518_C634_79C1_41BF_08456E54B1D1",
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40_1_HS_0_0.png",
   "width": 1080,
   "height": 750,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "id": "AnimatedImageResource_EE872539_C634_79C3_41C0_5F139E4D450B",
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_1_HS_1_0.png",
   "width": 1080,
   "height": 750,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "id": "AnimatedImageResource_EEA83515_C634_79C3_41D3_CD95A4DC902C",
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_1_HS_0_0.png",
   "width": 1080,
   "height": 750,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "id": "AnimatedImageResource_EEA85515_C634_79C3_41E0_6091C7CEDAF8",
 "frameDuration": 62,
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameCount": 9,
 "levels": [
  {
   "url": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_1_HS_1_0.png",
   "width": 300,
   "height": 270,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "id": "AnimatedImageResource_EE93D51E_C634_79C1_4199_FCDDF2FE4CA6",
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9_1_HS_0_0.png",
   "width": 1080,
   "height": 750,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "id": "AnimatedImageResource_EE960517_C634_79CE_41A3_AD59E10D5AB0",
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_1_HS_0_0.png",
   "width": 1080,
   "height": 750,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "id": "AnimatedImageResource_EE9BB528_C634_79C1_41B3_1F353BE8FDD6",
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_1_HS_1_0.png",
   "width": 1080,
   "height": 750,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "id": "AnimatedImageResource_2C4AFA97_3DB9_B15E_41BC_F3A210220C09",
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_3F79A584_32AC_5C7A_419D_E5B5EC2463D0_1_HS_1_0.png",
   "width": 1080,
   "height": 750,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "id": "AnimatedImageResource_2C4B5A97_3DB9_B15E_41A5_9E8AEC926BE5",
 "frameDuration": 62,
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameCount": 9,
 "levels": [
  {
   "url": "media/panorama_3F79A584_32AC_5C7A_419D_E5B5EC2463D0_1_HS_2_0.png",
   "width": 300,
   "height": 300,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "id": "AnimatedImageResource_EE96A517_C634_79CF_41BB_38AC08D7DC61",
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_1_HS_1_0.png",
   "width": 1080,
   "height": 750,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "id": "AnimatedImageResource_2C463A90_3DB9_B152_41CD_982BA9ED3EB4",
 "frameDuration": 62,
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameCount": 9,
 "levels": [
  {
   "url": "media/panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_1_HS_3_0.png",
   "width": 300,
   "height": 300,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "id": "AnimatedImageResource_2C41EA8E_3DB9_B14E_41C6_68A7E2972DDF",
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_3E51A3EA_329B_DB8E_41B3_D516BBB498CC_1_HS_0_0.png",
   "width": 1080,
   "height": 750,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "id": "AnimatedImageResource_2C42CA8E_3DB9_B14E_41C7_7960FB9BF9F2",
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_3E51A3EA_329B_DB8E_41B3_D516BBB498CC_1_HS_1_0.png",
   "width": 1080,
   "height": 750,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "id": "AnimatedImageResource_EE902520_C634_79C1_41BF_257FBF304234",
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D_1_HS_0_0.png",
   "width": 1080,
   "height": 750,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "id": "AnimatedImageResource_2FA12AAC_3DB9_B173_41CA_1090258E1658",
 "frameDuration": 62,
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameCount": 9,
 "levels": [
  {
   "url": "media/panorama_3E24D2BF_32A4_D587_4192_FCC0A640BC00_1_HS_0_0.png",
   "width": 300,
   "height": 270,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "id": "AnimatedImageResource_2FA22AAC_3DB9_B173_41B9_E241420779C1",
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_3E24D2BF_32A4_D587_4192_FCC0A640BC00_1_HS_2_0.png",
   "width": 1080,
   "height": 750,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "id": "AnimatedImageResource_EE85753D_C634_79C3_41D0_D071D6C1482E",
 "frameDuration": 62,
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameCount": 9,
 "levels": [
  {
   "url": "media/panorama_E609D5D6_C65C_5841_41DC_4408506ECD34_1_HS_0_0.png",
   "width": 300,
   "height": 270,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "id": "AnimatedImageResource_EEA93516_C634_79C1_41D5_E7DFC2676D36",
 "frameDuration": 62,
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameCount": 9,
 "levels": [
  {
   "url": "media/panorama_CF1013BA_C391_98A2_4167_0505D502E364_1_HS_0_0.png",
   "width": 300,
   "height": 270,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "id": "AnimatedImageResource_2C434A8E_3DB9_B14E_41C4_C729FF1A72EF",
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_3E6FB4EF_32E5_BD87_4187_4E27487A5391_1_HS_0_0.png",
   "width": 1080,
   "height": 750,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "id": "AnimatedImageResource_2C43AA8F_3DB9_B14E_41C2_94FF47C7E6F2",
 "frameDuration": 62,
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameCount": 9,
 "levels": [
  {
   "url": "media/panorama_3E6FB4EF_32E5_BD87_4187_4E27487A5391_1_HS_1_0.png",
   "width": 300,
   "height": 300,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "id": "AnimatedImageResource_2FB45AA0_3DB9_B172_41B6_A14EE6CE31C0",
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_3FF204B8_32AD_FD8A_41C8_A348279F77D9_1_HS_0_0.png",
   "width": 1080,
   "height": 750,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "id": "AnimatedImageResource_2FB4AAA0_3DB9_B172_41C2_22EC070ED84F",
 "frameDuration": 62,
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameCount": 9,
 "levels": [
  {
   "url": "media/panorama_3FF204B8_32AD_FD8A_41C8_A348279F77D9_1_HS_1_0.png",
   "width": 300,
   "height": 300,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "id": "AnimatedImageResource_EE9AE527_C634_79CF_41CB_542FF5E39B28",
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5_1_HS_0_0.png",
   "width": 1080,
   "height": 750,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "id": "AnimatedImageResource_EE868537_C634_79CF_41DE_C101E360270A",
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_1_HS_1_0.png",
   "width": 1080,
   "height": 750,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "id": "AnimatedImageResource_2FA43AAD_3DB9_B14D_41C1_0E3BC4AE01C1",
 "frameDuration": 62,
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameCount": 9,
 "levels": [
  {
   "url": "media/panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_1_HS_3_0.png",
   "width": 300,
   "height": 300,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "id": "AnimatedImageResource_EE92251D_C634_79C3_41D0_BCD536C9B445",
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2_1_HS_0_0.png",
   "width": 1080,
   "height": 750,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "id": "AnimatedImageResource_EE84253B_C634_79C7_41E0_968E01AFCA33",
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_1_HS_0_0.png",
   "width": 1080,
   "height": 750,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "id": "AnimatedImageResource_EE9B3529_C634_79C3_41E2_6373077866CD",
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6_1_HS_0_0.png",
   "width": 1080,
   "height": 750,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "id": "AnimatedImageResource_EE9D8526_C634_79C1_41D1_BFDADEF90055",
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5_1_HS_0_0.png",
   "width": 1080,
   "height": 750,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "id": "AnimatedImageResource_2FA0DAA6_3DB9_B17E_41C2_D89D0A71AECE",
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_3E3FB1E6_32A7_D786_41C1_CD16D7C1F309_1_HS_2_0.png",
   "width": 1080,
   "height": 750,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "id": "AnimatedImageResource_2FA12AAB_3DB9_B175_41A2_275777BD00C9",
 "frameDuration": 62,
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameCount": 9,
 "levels": [
  {
   "url": "media/panorama_3E3FB1E6_32A7_D786_41C1_CD16D7C1F309_1_HS_3_0.png",
   "width": 300,
   "height": 300,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "id": "AnimatedImageResource_2C499A96_3DB9_B15E_41C1_410A502395D1",
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_3F570BCA_32AC_AB8E_418D_9A4B6CEEBAEF_1_HS_0_0.png",
   "width": 1080,
   "height": 750,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "id": "AnimatedImageResource_2C4A2A96_3DB9_B15E_41CD_A54AFB76D8BA",
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_3F570BCA_32AC_AB8E_418D_9A4B6CEEBAEF_1_HS_2_0.png",
   "width": 1080,
   "height": 750,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "id": "AnimatedImageResource_EE84853A_C634_79C1_41DD_0215F77B0541",
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A_1_HS_0_0.png",
   "width": 1080,
   "height": 750,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "id": "AnimatedImageResource_EE92B51D_C634_79C3_41E6_BF230F987FF4",
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_1_HS_1_0.png",
   "width": 1080,
   "height": 750,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "id": "AnimatedImageResource_2C4EAA98_3DB9_B152_41A7_DBCA9DDEC464",
 "frameDuration": 62,
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameCount": 9,
 "levels": [
  {
   "url": "media/panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_1_HS_3_0.png",
   "width": 300,
   "height": 300,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "id": "AnimatedImageResource_2C4DBA98_3DB9_B152_41BD_396F8B422100",
 "frameDuration": 62,
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameCount": 9,
 "levels": [
  {
   "url": "media/panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA_1_HS_0_0.png",
   "width": 300,
   "height": 270,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "id": "AnimatedImageResource_EE90B51F_C634_79FF_41C5_A79C01C84446",
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_1_HS_1_0.png",
   "width": 1080,
   "height": 750,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "id": "AnimatedImageResource_EE861538_C634_79C1_41E5_D5BEC86A2DD1",
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D_1_HS_0_0.png",
   "width": 1080,
   "height": 750,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "id": "AnimatedImageResource_2C4C9A97_3DB9_B15E_41B3_4248AAC9A304",
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_3E7EC44F_32AB_DC87_41C2_5748F1C76A53_1_HS_0_0.png",
   "width": 1080,
   "height": 750,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "id": "AnimatedImageResource_2C4D5A97_3DB9_B15E_41C9_074D423004C5",
 "frameDuration": 62,
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameCount": 9,
 "levels": [
  {
   "url": "media/panorama_3E7EC44F_32AB_DC87_41C2_5748F1C76A53_1_HS_2_0.png",
   "width": 300,
   "height": 270,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "id": "AnimatedImageResource_EE94B519_C634_79C3_41E2_987DBE2A3C20",
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4_1_HS_0_0.png",
   "width": 1080,
   "height": 750,
   "class": "ImageResourceLevel"
  }
 ]
}],
 "backgroundPreloadEnabled": true,
 "minWidth": 20,
 "horizontalAlign": "left",
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "scrollBarVisible": "rollOver",
 "vrPolyfillScale": 0.5,
 "mouseWheelEnabled": true,
 "gap": 10,
 "overflow": "visible",
 "data": {
  "name": "Player1235"
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
