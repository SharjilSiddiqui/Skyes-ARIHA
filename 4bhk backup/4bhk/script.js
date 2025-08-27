(function(){
    var script = {
 "children": [
  "this.MainViewer"
 ],
 "id": "rootPlayer",
 "paddingLeft": 0,
 "paddingBottom": 0,
 "paddingRight": 0,
 "start": "this.init()",
 "verticalAlign": "top",
 "width": "100%",
 "backgroundPreloadEnabled": true,
 "scrollBarWidth": 10,
 "overflow": "visible",
 "layout": "absolute",
 "minHeight": 20,
 "borderSize": 0,
 "desktopMipmappingEnabled": false,
 "minWidth": 20,
 "scrollBarColor": "#000000",
 "mobileMipmappingEnabled": false,
 "class": "Player",
 "scrollBarVisible": "rollOver",
 "horizontalAlign": "left",
 "definitions": [{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_F204321A_C71F_3976_41E3_A3308E44A841",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 58.6,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "frames": [
  {
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_t.jpg"
  }
 ],
 "hfovMin": "150%",
 "label": "4bhk kitchen",
 "id": "panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C",
 "hfov": 360,
 "overlays": [
  "this.overlay_D6C3F8D5_C723_4AF3_41E1_A8B34E8F3123"
 ],
 "pitch": 0,
 "adjacentPanoramas": [
  {
   "backwardYaw": -20.98,
   "class": "AdjacentPanorama",
   "yaw": -59.5,
   "panorama": "this.panorama_CC48A826_C71D_4951_41E7_7F28A52014B9",
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_t.jpg"
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_F0C82386_C71F_3F5E_41DA_BDBCBAFF2A9A",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 48.41,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -168.57,
  "pitch": -1
 }
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_F218120C_C71F_3952_41E1_E14D7DECE8FA",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -158.23,
  "pitch": 0
 }
},
{
 "frames": [
  {
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_t.jpg"
  }
 ],
 "hfovMin": "150%",
 "label": "4BHK BEDROOM 02 2 28th",
 "id": "panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558",
 "hfov": 360,
 "overlays": [
  "this.overlay_E3C0EB9C_C727_CF72_41D8_2929BE9FB4EE",
  "this.overlay_E2CC1B58_C725_4FF1_41E7_2F6766A1B20D"
 ],
 "pitch": 0,
 "adjacentPanoramas": [
  {
   "backwardYaw": 30.28,
   "class": "AdjacentPanorama",
   "yaw": -142.03,
   "panorama": "this.panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932",
   "distance": 1
  },
  {
   "backwardYaw": 78.93,
   "class": "AdjacentPanorama",
   "yaw": -21.43,
   "panorama": "this.panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F",
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_t.jpg"
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "frames": [
  {
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932_t.jpg"
  }
 ],
 "hfovMin": "135%",
 "label": "4bhk living 01 28th",
 "id": "panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932",
 "hfov": 360,
 "overlays": [
  "this.overlay_E77541FB_C727_7AB6_41E2_71A4F3A251EC",
  "this.overlay_E66DCEAD_C727_4953_41E4_4338D4DA1A80",
  "this.overlay_E57D9766_C725_47DE_41E4_4EAD320D7E97",
  "this.overlay_E6FF7EBA_C723_46B1_41E8_B0C4C865F516"
 ],
 "pitch": 0,
 "adjacentPanoramas": [
  {
   "backwardYaw": -142.03,
   "class": "AdjacentPanorama",
   "yaw": 30.28,
   "panorama": "this.panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558",
   "distance": 1
  },
  {
   "backwardYaw": 1.29,
   "class": "AdjacentPanorama",
   "yaw": 128.01,
   "panorama": "this.panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01",
   "distance": 1
  },
  {
   "backwardYaw": -119.02,
   "class": "AdjacentPanorama",
   "yaw": -166.12,
   "panorama": "this.panorama_CD47441A_C71C_F976_41E5_56E16AD8E357",
   "distance": 1
  },
  {
   "backwardYaw": -62.51,
   "class": "AdjacentPanorama",
   "yaw": -20.22,
   "panorama": "this.panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A",
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932_t.jpg"
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_F2F0A22A_C71F_3956_41E8_81A878C590AA",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 116.86,
  "pitch": 0
 }
},
{
 "frames": [
  {
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD479071_C71C_D9B2_41D0_92945B278722_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD479071_C71C_D9B2_41D0_92945B278722_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD479071_C71C_D9B2_41D0_92945B278722_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD479071_C71C_D9B2_41D0_92945B278722_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD479071_C71C_D9B2_41D0_92945B278722_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD479071_C71C_D9B2_41D0_92945B278722_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD479071_C71C_D9B2_41D0_92945B278722_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD479071_C71C_D9B2_41D0_92945B278722_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD479071_C71C_D9B2_41D0_92945B278722_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD479071_C71C_D9B2_41D0_92945B278722_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD479071_C71C_D9B2_41D0_92945B278722_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD479071_C71C_D9B2_41D0_92945B278722_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD479071_C71C_D9B2_41D0_92945B278722_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD479071_C71C_D9B2_41D0_92945B278722_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD479071_C71C_D9B2_41D0_92945B278722_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD479071_C71C_D9B2_41D0_92945B278722_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD479071_C71C_D9B2_41D0_92945B278722_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD479071_C71C_D9B2_41D0_92945B278722_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_CD479071_C71C_D9B2_41D0_92945B278722_t.jpg"
  }
 ],
 "hfovMin": "135%",
 "label": "4bhk living 01 33rd",
 "id": "panorama_CD479071_C71C_D9B2_41D0_92945B278722",
 "hfov": 360,
 "overlays": [
  "this.overlay_EEDAB568_C725_FBD2_41DB_8D04CB4292A1",
  "this.overlay_EDFCD5B0_C724_DAB2_41D6_0E77907C4F3F",
  "this.overlay_EC51FEB1_C727_46B2_41B8_83F109FE0A5A",
  "this.overlay_ECD21C73_C725_C9B6_4192_D031F772D6EA"
 ],
 "pitch": 0,
 "adjacentPanoramas": [
  {
   "backwardYaw": -121.4,
   "class": "AdjacentPanorama",
   "yaw": -167,
   "panorama": "this.panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD",
   "distance": 1
  },
  {
   "backwardYaw": -143.41,
   "class": "AdjacentPanorama",
   "yaw": 28.27,
   "panorama": "this.panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545",
   "distance": 1
  },
  {
   "backwardYaw": -63.14,
   "class": "AdjacentPanorama",
   "yaw": -20.22,
   "panorama": "this.panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC",
   "distance": 1
  },
  {
   "backwardYaw": -0.72,
   "class": "AdjacentPanorama",
   "yaw": 128.26,
   "panorama": "this.panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42",
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_CD479071_C71C_D9B2_41D0_92945B278722_t.jpg"
},
{
 "frames": [
  {
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_t.jpg"
  }
 ],
 "hfovMin": "150%",
 "label": "4BHK BEDROOM 03 1 28th",
 "id": "panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3",
 "hfov": 360,
 "overlays": [
  "this.overlay_E039B42F_C73C_D9AE_4179_6CED54A79A5C"
 ],
 "pitch": 0,
 "adjacentPanoramas": [
  {
   "backwardYaw": -148.17,
   "class": "AdjacentPanorama",
   "yaw": -82.1,
   "panorama": "this.panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A",
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_t.jpg"
},
{
 "frames": [
  {
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_t.jpg"
  }
 ],
 "hfovMin": "150%",
 "label": "4bhk kitchen",
 "id": "panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC",
 "hfov": 360,
 "overlays": [
  "this.overlay_F418FFB4_C727_46B1_41E3_7157AAB75A6C"
 ],
 "pitch": 0,
 "adjacentPanoramas": [
  {
   "backwardYaw": -20.22,
   "class": "AdjacentPanorama",
   "yaw": -63.14,
   "panorama": "this.panorama_CD479071_C71C_D9B2_41D0_92945B278722",
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_t.jpg"
},
{
 "frames": [
  {
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_t.jpg"
  }
 ],
 "hfovMin": "150%",
 "label": "4BHK BEDROOM 02 1 23rd",
 "id": "panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751",
 "hfov": 360,
 "overlays": [
  "this.overlay_DB599724_C763_4752_41D6_A0FA163F689B"
 ],
 "pitch": 0,
 "adjacentPanoramas": [
  {
   "backwardYaw": -14.77,
   "class": "AdjacentPanorama",
   "yaw": 68.88,
   "panorama": "this.panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4",
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_t.jpg"
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_F09D1397_C71F_3F7F_41D0_7CB03CE73714",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 31.83,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -171.08,
  "pitch": -2.01
 }
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_FAB08ECF_C71C_C6EE_41C8_8F338E08E64D",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 46.4,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_F1EA82E8_C71F_3ED2_41E5_1602AD6F35CA",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 37.97,
  "pitch": 0
 }
},
{
 "frames": [
  {
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB_t.jpg"
  }
 ],
 "hfovMin": "135%",
 "label": "4bhk living 01 23rd",
 "id": "panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB",
 "hfov": 360,
 "overlays": [
  "this.overlay_D079CAD6_C77D_CEFE_41DD_ABBE2AA0167E",
  "this.overlay_DF5FBBAA_C77C_CF56_41E7_7C881B931889",
  "this.overlay_DF1B664B_C763_59D6_41D4_1CCBA4B7384E",
  "this.overlay_DFF6DAC7_C765_4EDE_41D5_CD99DAE5DE58"
 ],
 "pitch": 0,
 "adjacentPanoramas": [
  {
   "backwardYaw": -0.72,
   "class": "AdjacentPanorama",
   "yaw": 127.75,
   "panorama": "this.panorama_CD732023_C71F_F956_41D6_6910628043DA",
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB"
  },
  {
   "backwardYaw": -58.37,
   "class": "AdjacentPanorama",
   "yaw": -21.73,
   "panorama": "this.panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1",
   "distance": 1
  },
  {
   "backwardYaw": -143.41,
   "class": "AdjacentPanorama",
   "yaw": 29.15,
   "panorama": "this.panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4",
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB_t.jpg"
},
{
 "frames": [
  {
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_t.jpg"
  }
 ],
 "hfovMin": "150%",
 "label": "4BHK BEDROOM 04 1 28th",
 "id": "panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD",
 "hfov": 360,
 "overlays": [
  "this.overlay_E0AC7D99_C73D_CB72_41E2_CDE435C74BDD",
  "this.overlay_EFD00FA6_C73C_C75E_41E0_8DE91C303B0D"
 ],
 "pitch": 0,
 "adjacentPanoramas": [
  {
   "backwardYaw": 94.08,
   "class": "AdjacentPanorama",
   "yaw": 154.28,
   "panorama": "this.panorama_CD47441A_C71C_F976_41E5_56E16AD8E357",
   "distance": 1
  },
  {
   "backwardYaw": 68.38,
   "class": "AdjacentPanorama",
   "yaw": -19.04,
   "panorama": "this.panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD",
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_t.jpg"
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_F0BBA386_C71F_3F5E_41E3_A28C774DE755",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -35.5,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "frames": [
  {
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD47441A_C71C_F976_41E5_56E16AD8E357_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD47441A_C71C_F976_41E5_56E16AD8E357_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD47441A_C71C_F976_41E5_56E16AD8E357_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD47441A_C71C_F976_41E5_56E16AD8E357_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD47441A_C71C_F976_41E5_56E16AD8E357_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD47441A_C71C_F976_41E5_56E16AD8E357_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD47441A_C71C_F976_41E5_56E16AD8E357_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD47441A_C71C_F976_41E5_56E16AD8E357_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD47441A_C71C_F976_41E5_56E16AD8E357_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD47441A_C71C_F976_41E5_56E16AD8E357_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD47441A_C71C_F976_41E5_56E16AD8E357_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD47441A_C71C_F976_41E5_56E16AD8E357_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD47441A_C71C_F976_41E5_56E16AD8E357_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD47441A_C71C_F976_41E5_56E16AD8E357_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD47441A_C71C_F976_41E5_56E16AD8E357_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD47441A_C71C_F976_41E5_56E16AD8E357_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD47441A_C71C_F976_41E5_56E16AD8E357_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD47441A_C71C_F976_41E5_56E16AD8E357_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_CD47441A_C71C_F976_41E5_56E16AD8E357_t.jpg"
  }
 ],
 "hfovMin": "135%",
 "label": "4bhk living 02 28th",
 "id": "panorama_CD47441A_C71C_F976_41E5_56E16AD8E357",
 "hfov": 360,
 "overlays": [
  "this.overlay_E69088C4_C72C_CAD2_41E2_67849E970973",
  "this.overlay_E5D3EE61_C72D_49D2_41E0_D1B634887F8E",
  "this.overlay_E44921C1_C72D_3AD3_41D0_85751F7FA73A"
 ],
 "pitch": 0,
 "adjacentPanoramas": [
  {
   "backwardYaw": 154.28,
   "class": "AdjacentPanorama",
   "yaw": 94.08,
   "panorama": "this.panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD",
   "distance": 1
  },
  {
   "backwardYaw": 21.89,
   "class": "AdjacentPanorama",
   "yaw": 76.37,
   "panorama": "this.panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A",
   "distance": 1
  },
  {
   "backwardYaw": -166.12,
   "class": "AdjacentPanorama",
   "yaw": -119.02,
   "panorama": "this.panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932",
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_CD47441A_C71C_F976_41E5_56E16AD8E357_t.jpg"
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_F9280F2F_C71C_C7AE_41B9_C662FB698621",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 36.59,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_F238E1F9_C71F_3AB3_4192_AE1A353DBB1D",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -149.85,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_F2253209_C71F_3953_416D_B676A65CC600",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -25.97,
  "pitch": 0
 }
},
{
 "frames": [
  {
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_t.jpg"
  }
 ],
 "hfovMin": "150%",
 "label": "4BHK BEDROOM 02 2 23rd",
 "id": "panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4",
 "hfov": 360,
 "overlays": [
  "this.overlay_DC659AFB_C76F_4EB6_41D5_0F1877D4D037",
  "this.overlay_DCF81359_C76F_7FF3_41A8_62F50E047FA0"
 ],
 "pitch": 0,
 "adjacentPanoramas": [
  {
   "backwardYaw": 29.15,
   "class": "AdjacentPanorama",
   "yaw": -143.41,
   "panorama": "this.panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB",
   "distance": 1
  },
  {
   "backwardYaw": 68.88,
   "class": "AdjacentPanorama",
   "yaw": -14.77,
   "panorama": "this.panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751",
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_t.jpg"
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_F286A279_C71F_39B2_41B0_E0A7C0F6B25F",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 158.27,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_F93BCF1F_C71C_C76E_418D_0F8D189DB31A",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 121.63,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_CD47441A_C71C_F976_41E5_56E16AD8E357_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_F079E327_C71F_3F5E_41E5_8F085A215574",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -150.85,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_F13282B9_C71F_3EB3_41E3_674757C47BB2",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -149.72,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_F020C356_C71F_3FFE_41C7_2229F3CB1CED",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -85.67,
  "pitch": 0
 }
},
{
 "class": "PlayList",
 "id": "mainPlayList",
 "items": [
  {
   "camera": "this.panorama_CC48A826_C71D_4951_41E7_7F28A52014B9_camera",
   "media": "this.panorama_CC48A826_C71D_4951_41E7_7F28A52014B9",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "camera": "this.panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB_camera",
   "media": "this.panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "camera": "this.panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_camera",
   "media": "this.panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "camera": "this.panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_camera",
   "media": "this.panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "camera": "this.panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_camera",
   "media": "this.panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "camera": "this.panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_camera",
   "media": "this.panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "camera": "this.panorama_CC175683_C71F_5956_41AA_704EB81E1F05_camera",
   "media": "this.panorama_CC175683_C71F_5956_41AA_704EB81E1F05",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 6, 7)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "camera": "this.panorama_CD888F1A_C71C_C776_41E5_354715787DA9_camera",
   "media": "this.panorama_CD888F1A_C71C_C776_41E5_354715787DA9",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 7, 8)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "camera": "this.panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_camera",
   "media": "this.panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 8, 9)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "camera": "this.panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_camera",
   "media": "this.panorama_CC131311_C71D_3F72_41C7_6DBD9418A942",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 9, 10)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "camera": "this.panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_camera",
   "media": "this.panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 10, 11)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "camera": "this.panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB_camera",
   "media": "this.panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 11, 12)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "camera": "this.panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86_camera",
   "media": "this.panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 12, 13)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "camera": "this.panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_camera",
   "media": "this.panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 13, 14)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "camera": "this.panorama_CD732023_C71F_F956_41D6_6910628043DA_camera",
   "media": "this.panorama_CD732023_C71F_F956_41D6_6910628043DA",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 14, 15)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "camera": "this.panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_camera",
   "media": "this.panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 15, 16)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "camera": "this.panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_camera",
   "media": "this.panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 16, 17)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "camera": "this.panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_camera",
   "media": "this.panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 17, 18)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "camera": "this.panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_camera",
   "media": "this.panorama_CD93C521_C71D_3B53_41E8_25606B0344D0",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 18, 19)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "camera": "this.panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_camera",
   "media": "this.panorama_CD894C2A_C71C_C951_4172_7357AF61EE99",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 19, 20)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "camera": "this.panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_camera",
   "media": "this.panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 20, 21)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "camera": "this.panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_camera",
   "media": "this.panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 21, 22)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "camera": "this.panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932_camera",
   "media": "this.panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 22, 23)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "camera": "this.panorama_CD47441A_C71C_F976_41E5_56E16AD8E357_camera",
   "media": "this.panorama_CD47441A_C71C_F976_41E5_56E16AD8E357",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 23, 24)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "camera": "this.panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_camera",
   "media": "this.panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A",
   "start": "this.MainViewerPanoramaPlayer.set('displayPlaybackBar', false)",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 24, 25)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "camera": "this.panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_camera",
   "media": "this.panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 25, 26)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "camera": "this.panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_camera",
   "media": "this.panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 26, 27)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "camera": "this.panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_camera",
   "media": "this.panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 27, 28)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "camera": "this.panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_camera",
   "media": "this.panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 28, 29)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "camera": "this.panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_camera",
   "media": "this.panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 29, 30)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "camera": "this.panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_camera",
   "media": "this.panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 30, 31)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "camera": "this.panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_camera",
   "media": "this.panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 31, 32)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "camera": "this.panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_camera",
   "media": "this.panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 32, 33)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "camera": "this.panorama_CDBE40B7_C71D_DABE_41E4_FF4737531D9D_camera",
   "media": "this.panorama_CDBE40B7_C71D_DABE_41E4_FF4737531D9D",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 33, 34)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "camera": "this.panorama_CD479071_C71C_D9B2_41D0_92945B278722_camera",
   "media": "this.panorama_CD479071_C71C_D9B2_41D0_92945B278722",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 34, 35)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "camera": "this.panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD_camera",
   "media": "this.panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 35, 36)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "camera": "this.panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_camera",
   "media": "this.panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 36, 37)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "camera": "this.panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_camera",
   "media": "this.panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 37, 38)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "camera": "this.panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_camera",
   "media": "this.panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 38, 39)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "camera": "this.panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_camera",
   "media": "this.panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 39, 40)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "camera": "this.panorama_CD973440_C71F_79D2_41CE_832903CFC20A_camera",
   "media": "this.panorama_CD973440_C71F_79D2_41CE_832903CFC20A",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 40, 41)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "camera": "this.panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_camera",
   "media": "this.panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 41, 42)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "camera": "this.panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_camera",
   "media": "this.panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 42, 43)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "camera": "this.panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_camera",
   "media": "this.panorama_EBE3DC98_C723_4972_41E0_39A7A1000045",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 43, 44)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "camera": "this.panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_camera",
   "media": "this.panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05",
   "end": "this.trigger('tourEnded')",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 44, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  }
 ]
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_F197731D_C71F_3F72_41E1_0571D76DF8D2",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 37.59,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_F0F54370_C71F_3FB2_4157_33158F557BB8",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 97.9,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_F17C4279_C71F_39B2_41E6_0F1F0EE7ECD3",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -109.11,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_F94A5F19_C71C_C772_41E6_AABB9E5DEB55",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 179.28,
  "pitch": 0
 }
},
{
 "frames": [
  {
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_t.jpg"
  }
 ],
 "hfovMin": "150%",
 "label": "4BHK BEDROOM 04 2 23rd",
 "id": "panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6",
 "hfov": 360,
 "overlays": [
  "this.overlay_D8D0AEBD_C71D_46B2_41E2_77FAFEC5B3BD"
 ],
 "pitch": 0,
 "adjacentPanoramas": [
  {
   "backwardYaw": -19.17,
   "class": "AdjacentPanorama",
   "yaw": 69.51,
   "panorama": "this.panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC",
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_t.jpg"
},
{
 "frames": [
  {
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_t.jpg"
  }
 ],
 "hfovMin": "150%",
 "label": "4BHK BEDROOM 03 2 28th",
 "id": "panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A",
 "hfov": 360,
 "overlays": [
  "this.overlay_E11B8401_C724_F952_41BA_B115171D0330",
  "this.overlay_E05F9DD6_C723_CAF1_41E7_95CA81350DF9"
 ],
 "pitch": 0,
 "adjacentPanoramas": [
  {
   "backwardYaw": 76.37,
   "class": "AdjacentPanorama",
   "yaw": 21.89,
   "panorama": "this.panorama_CD47441A_C71C_F976_41E5_56E16AD8E357",
   "distance": 1
  },
  {
   "backwardYaw": -82.1,
   "class": "AdjacentPanorama",
   "yaw": -148.17,
   "panorama": "this.panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3",
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_t.jpg"
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 154,
  "pitch": -1.26
 }
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_FF7143B6_C71F_3EB1_41D3_859A899B00B4",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 159.78,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_F0AAF397_C71F_3F7F_41DC_55CDB271673C",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -86.17,
  "pitch": 0
 }
},
{
 "frames": [
  {
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_t.jpg"
  }
 ],
 "hfovMin": "150%",
 "label": "4BHK BEDROOM 03 1 23rd",
 "id": "panorama_CD894C2A_C71C_C951_4172_7357AF61EE99",
 "hfov": 360,
 "overlays": [
  "this.overlay_DA67D643_C765_39D6_41E7_BD2D534FD43E"
 ],
 "pitch": 0,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_CD93C521_C71D_3B53_41E8_25606B0344D0"
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_t.jpg"
},
{
 "frames": [
  {
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_t.jpg"
  }
 ],
 "hfovMin": "150%",
 "label": "4BHK BEDROOM 02 1 33rd",
 "id": "panorama_CD973440_C71F_79D2_41CE_832903CFC20A",
 "hfov": 360,
 "overlays": [
  "this.overlay_E8B6B81F_C72D_496E_41E6_150256507011"
 ],
 "pitch": 0,
 "adjacentPanoramas": [
  {
   "backwardYaw": -22.69,
   "class": "AdjacentPanorama",
   "yaw": 71.39,
   "panorama": "this.panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545",
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_t.jpg"
},
{
 "frames": [
  {
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_t.jpg"
  }
 ],
 "hfovMin": "150%",
 "label": "4BHK BEDROOM 01 2 28th",
 "id": "panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01",
 "hfov": 360,
 "overlays": [
  "this.overlay_E4AC823C_C723_F9B2_41B4_39B29FEEA91C",
  "this.overlay_E33D35E2_C723_3AD1_41A1_22D3C41AFB56"
 ],
 "pitch": 0,
 "adjacentPanoramas": [
  {
   "backwardYaw": 128.01,
   "class": "AdjacentPanorama",
   "yaw": 1.29,
   "panorama": "this.panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932",
   "distance": 1
  },
  {
   "backwardYaw": -136.37,
   "class": "AdjacentPanorama",
   "yaw": 144.5,
   "panorama": "this.panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE",
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_t.jpg"
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_F149A2A8_C71F_3952_41C7_50E2C8939C06",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -158.36,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_F211621A_C71F_3976_41E2_9FBD48AB97A3",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 10.11,
  "pitch": 0
 }
},
{
 "frames": [
  {
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_t.jpg"
  }
 ],
 "hfovMin": "150%",
 "label": "4BHK BEDROOM 04 1 33rd",
 "id": "panorama_EBE3DC98_C723_4972_41E0_39A7A1000045",
 "hfov": 360,
 "overlays": [
  "this.overlay_F4E4001F_C725_596E_41E0_DD5EA526DD91",
  "this.overlay_F3F318C8_C723_4AD2_41E2_333E3532C07C"
 ],
 "pitch": 0,
 "adjacentPanoramas": [
  {
   "backwardYaw": 70.89,
   "class": "AdjacentPanorama",
   "yaw": -18.67,
   "panorama": "this.panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05",
   "distance": 1
  },
  {
   "backwardYaw": 77.5,
   "class": "AdjacentPanorama",
   "yaw": 152.65,
   "panorama": "this.panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD",
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_t.jpg"
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_F22FD201_C71F_3953_41E5_65CF24E49C2D",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 158.44,
  "pitch": 0
 }
},
{
 "frames": [
  {
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_t.jpg"
  }
 ],
 "hfovMin": "150%",
 "label": "4BHK BEDROOM 01 2 17th",
 "id": "panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2",
 "hfov": 360,
 "overlays": [
  "this.overlay_D51089C5_C765_CAD2_41E5_192F51616448",
  "this.overlay_D5FA2C1E_C764_C971_41E4_AEEDE47EBAA0"
 ],
 "pitch": 0,
 "adjacentPanoramas": [
  {
   "backwardYaw": -138.88,
   "class": "AdjacentPanorama",
   "yaw": 155.88,
   "panorama": "this.panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA",
   "distance": 1
  },
  {
   "backwardYaw": 127.75,
   "class": "AdjacentPanorama",
   "yaw": 0.29,
   "panorama": "this.panorama_CC48A826_C71D_4951_41E7_7F28A52014B9",
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_t.jpg"
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_F08C63A6_C71F_3F5E_41CC_29213194E74D",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -31.98,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_F2D0D24A_C71F_39D1_4192_4CFF774A9BE9",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 41.12,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_F06B9331_C71F_3FB2_41DF_42285E58C032",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -111.12,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_F909AF3F_C71C_C7AE_41E2_08E927F62DF8",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -85.92,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_F1738289_C71F_3953_41E3_B04BF9E67BD6",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -102.5,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_F2DD823A_C71F_39B6_41E5_AC9C806F991B",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -24.12,
  "pitch": 0
 }
},
{
 "frames": [
  {
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_t.jpg"
  }
 ],
 "hfovMin": "150%",
 "label": "4bhk kitchen",
 "id": "panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1",
 "hfov": 360,
 "overlays": [
  "this.overlay_DD3041EE_C764_DAAE_41E6_5D3D4684B50F"
 ],
 "pitch": 0,
 "adjacentPanoramas": [
  {
   "backwardYaw": -21.73,
   "class": "AdjacentPanorama",
   "yaw": -58.37,
   "panorama": "this.panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB",
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_t.jpg"
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_F1F892D8_C71F_3EF1_41D7_E4CB35F1710F",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 158.57,
  "pitch": 0
 }
},
{
 "frames": [
  {
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_t.jpg"
  }
 ],
 "hfovMin": "150%",
 "label": "4BHK BEDROOM 02 1 28th",
 "id": "panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F",
 "hfov": 360,
 "overlays": [
  "this.overlay_E167051F_C725_5B6F_41E8_EC2A8AF34DDA"
 ],
 "pitch": 0,
 "adjacentPanoramas": [
  {
   "backwardYaw": -21.43,
   "class": "AdjacentPanorama",
   "yaw": 78.93,
   "panorama": "this.panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558",
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_t.jpg"
},
{
 "frames": [
  {
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_t.jpg"
  }
 ],
 "hfovMin": "150%",
 "label": "4BHK BEDROOM 02 1 17th",
 "id": "panorama_CC175683_C71F_5956_41AA_704EB81E1F05",
 "hfov": 360,
 "overlays": [
  "this.overlay_D4F9B791_C76F_4773_41B6_B1727AC576AD"
 ],
 "pitch": 0,
 "adjacentPanoramas": [
  {
   "backwardYaw": -23.19,
   "class": "AdjacentPanorama",
   "yaw": 55.82,
   "panorama": "this.panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045",
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_t.jpg"
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_CDBE40B7_C71D_DABE_41E4_FF4737531D9D_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_F2A6625A_C71F_39F1_41C8_133B14D39F50",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 157.31,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_F107A2D8_C71F_3EF1_41E8_4A2843648F86",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 13.88,
  "pitch": 0
 }
},
{
 "frames": [
  {
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "overlays": [
    "this.overlay_E4FA5D36_C72C_CBBE_41DE_84376FB29EF5"
   ],
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
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
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  },
  {
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1_t.jpg"
  }
 ],
 "hfovMin": "150%",
 "label": "4bhk kitchen",
 "id": "panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A",
 "hfov": 360,
 "pitch": 0,
 "adjacentPanoramas": [
  {
   "backwardYaw": -20.22,
   "class": "AdjacentPanorama",
   "yaw": -62.51,
   "panorama": "this.panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932",
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "frameDisplayTime": 5000,
 "frameTransitionTime": 5000,
 "class": "LivePanorama",
 "thumbnailUrl": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1_t.jpg"
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_F153D299_C71F_3972_41E5_BAB2C2251150",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 159.02,
  "pitch": 0
 }
},
{
 "frames": [
  {
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_t.jpg"
  }
 ],
 "hfovMin": "150%",
 "label": "4BHK BEDROOM 03 2 23rd",
 "id": "panorama_CD93C521_C71D_3B53_41E8_25606B0344D0",
 "hfov": 360,
 "overlays": [
  "this.overlay_DB374A8C_C765_4952_41E1_A2E190D5388B",
  "this.overlay_D912F139_C767_5BB2_41DE_1B6920A1E6C5"
 ],
 "pitch": 0,
 "adjacentPanoramas": [
  {
   "backwardYaw": 93.83,
   "class": "AdjacentPanorama",
   "yaw": 21.64,
   "panorama": "this.panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86",
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0"
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_t.jpg"
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_F15C5299_C71F_3972_41E3_395ED5F18115",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 159.78,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_F0101356_C71F_3FFE_41E4_FB3D63DE41FA",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 160.96,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_CC48A826_C71D_4951_41E7_7F28A52014B9_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -171.58,
  "pitch": 1.51
 }
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_F24C91E6_C71F_3AD1_41E1_8205C1C88305",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 160.83,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_F1B29307_C71F_3F5E_41B0_50C890B83348",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 120.5,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_F2FDC22A_C71F_3956_41D3_9D6F0BBB0CA2",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 36.59,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_F25CC1CA_C71F_3AD6_41A4_EB03C92EC2AB",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 92.37,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_F259E1DB_C71F_3AF7_41C5_454744075055",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -87.17,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_F0E6F376_C71F_3FBE_41DC_1506264CAAB0",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 165.23,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_CD479071_C71C_D9B2_41D0_92945B278722_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -169.57,
  "pitch": 0.5
 }
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_F1DF32F2_C71F_3EB6_41CC_2A53FB7C9221",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -178.71,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_F11D52C8_C71F_3ED2_41C7_4B15F9043073",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -25.72,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_F12602C3_C71F_3ED7_41D0_E4F92900FAFF",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -101.07,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_CD888F1A_C71C_C776_41E5_354715787DA9_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_F186931F_C71F_3F6E_41D7_C0913B18FD37",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -179.71,
  "pitch": 0
 }
},
{
 "frames": [
  {
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB_t.jpg"
  }
 ],
 "hfovMin": "135%",
 "label": "4bhk living 02 17th",
 "id": "panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB",
 "hfov": 360,
 "overlays": [
  "this.overlay_D77E9814_C72D_C971_41D3_F1C7EEC185B4",
  "this.overlay_D6593DFD_C725_CAB3_41E1_22E863C59B7A",
  "this.overlay_D689F985_C723_4B53_41E0_EF19CAA46BA5"
 ],
 "pitch": 0,
 "adjacentPanoramas": [
  {
   "backwardYaw": 154.03,
   "class": "AdjacentPanorama",
   "yaw": 77.75,
   "panorama": "this.panorama_CC131311_C71D_3F72_41C7_6DBD9418A942",
   "distance": 1
  },
  {
   "backwardYaw": 21.77,
   "class": "AdjacentPanorama",
   "yaw": 92.83,
   "panorama": "this.panorama_CD888F1A_C71C_C776_41E5_354715787DA9",
   "distance": 1
  },
  {
   "backwardYaw": -169.89,
   "class": "AdjacentPanorama",
   "yaw": -126.3,
   "panorama": "this.panorama_CC48A826_C71D_4951_41E7_7F28A52014B9",
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB_t.jpg"
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_F03FB347_C71F_3FDE_41CA_EBFFB328541E",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 156.81,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_F0317347_C71F_3FDE_41CD_874271AC16A7",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 102.17,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_F05A7337_C71F_3FBE_41CA_5FA849FCD729",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -51.99,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_FABC3EBF_C71C_C6AE_41C9_BD0E3F001F06",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -52.25,
  "pitch": 0
 }
},
{
 "frames": [
  {
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_t.jpg"
  }
 ],
 "hfovMin": "150%",
 "label": "4BHK BEDROOM 04 2 28th",
 "id": "panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD",
 "hfov": 360,
 "overlays": [
  "this.overlay_EE27537F_C723_5FAE_41E1_DBA13BA4CC54"
 ],
 "pitch": 0,
 "adjacentPanoramas": [
  {
   "backwardYaw": -19.04,
   "class": "AdjacentPanorama",
   "yaw": 68.38,
   "panorama": "this.panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD",
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_t.jpg"
},
{
 "frames": [
  {
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD888F1A_C71C_C776_41E5_354715787DA9_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD888F1A_C71C_C776_41E5_354715787DA9_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD888F1A_C71C_C776_41E5_354715787DA9_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD888F1A_C71C_C776_41E5_354715787DA9_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD888F1A_C71C_C776_41E5_354715787DA9_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD888F1A_C71C_C776_41E5_354715787DA9_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD888F1A_C71C_C776_41E5_354715787DA9_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD888F1A_C71C_C776_41E5_354715787DA9_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD888F1A_C71C_C776_41E5_354715787DA9_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD888F1A_C71C_C776_41E5_354715787DA9_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD888F1A_C71C_C776_41E5_354715787DA9_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD888F1A_C71C_C776_41E5_354715787DA9_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD888F1A_C71C_C776_41E5_354715787DA9_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD888F1A_C71C_C776_41E5_354715787DA9_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD888F1A_C71C_C776_41E5_354715787DA9_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD888F1A_C71C_C776_41E5_354715787DA9_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD888F1A_C71C_C776_41E5_354715787DA9_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD888F1A_C71C_C776_41E5_354715787DA9_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_CD888F1A_C71C_C776_41E5_354715787DA9_t.jpg"
  }
 ],
 "hfovMin": "150%",
 "label": "4BHK BEDROOM 03 2 17th",
 "id": "panorama_CD888F1A_C71C_C776_41E5_354715787DA9",
 "hfov": 360,
 "overlays": [
  "this.overlay_D3646773_C765_47B6_41E0_73AF92AE0B87",
  "this.overlay_D246BEC5_C767_C6D3_417F_B7C47770AE7C"
 ],
 "pitch": 0,
 "adjacentPanoramas": [
  {
   "backwardYaw": -87.63,
   "class": "AdjacentPanorama",
   "yaw": -148.42,
   "panorama": "this.panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0",
   "distance": 1
  },
  {
   "backwardYaw": 92.83,
   "class": "AdjacentPanorama",
   "yaw": 21.77,
   "panorama": "this.panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB",
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_CD888F1A_C71C_C776_41E5_354715787DA9_t.jpg"
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_FF7E03A6_C71F_3F5E_41E4_4B0801E12337",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 31.58,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_F2B0D25A_C71F_39F1_41E6_C60FD30C1D2C",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -110.49,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "frames": [
  {
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_t.jpg"
  }
 ],
 "hfovMin": "150%",
 "label": "4BHK BEDROOM 01 1 28th",
 "id": "panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE",
 "hfov": 360,
 "overlays": [
  "this.overlay_E31F4E35_C725_49B2_41E3_75B373DD479F"
 ],
 "pitch": 0,
 "adjacentPanoramas": [
  {
   "backwardYaw": 144.5,
   "class": "AdjacentPanorama",
   "yaw": -136.37,
   "panorama": "this.panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01",
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_t.jpg"
},
{
 "frames": [
  {
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDBE40B7_C71D_DABE_41E4_FF4737531D9D_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CDBE40B7_C71D_DABE_41E4_FF4737531D9D_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CDBE40B7_C71D_DABE_41E4_FF4737531D9D_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDBE40B7_C71D_DABE_41E4_FF4737531D9D_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CDBE40B7_C71D_DABE_41E4_FF4737531D9D_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CDBE40B7_C71D_DABE_41E4_FF4737531D9D_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDBE40B7_C71D_DABE_41E4_FF4737531D9D_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CDBE40B7_C71D_DABE_41E4_FF4737531D9D_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CDBE40B7_C71D_DABE_41E4_FF4737531D9D_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDBE40B7_C71D_DABE_41E4_FF4737531D9D_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CDBE40B7_C71D_DABE_41E4_FF4737531D9D_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CDBE40B7_C71D_DABE_41E4_FF4737531D9D_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDBE40B7_C71D_DABE_41E4_FF4737531D9D_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CDBE40B7_C71D_DABE_41E4_FF4737531D9D_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CDBE40B7_C71D_DABE_41E4_FF4737531D9D_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDBE40B7_C71D_DABE_41E4_FF4737531D9D_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CDBE40B7_C71D_DABE_41E4_FF4737531D9D_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CDBE40B7_C71D_DABE_41E4_FF4737531D9D_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_CDBE40B7_C71D_DABE_41E4_FF4737531D9D_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "hfovMin": "150%",
 "label": "4BHK BEDROOM 04 1 33rd",
 "id": "panorama_CDBE40B7_C71D_DABE_41E4_FF4737531D9D",
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfov": 360,
 "thumbnailUrl": "media/panorama_CDBE40B7_C71D_DABE_41E4_FF4737531D9D_t.jpg"
},
{
 "frames": [
  {
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_t.jpg"
  }
 ],
 "hfovMin": "150%",
 "label": "4BHK BEDROOM 01 2 23rd",
 "id": "panorama_CD732023_C71F_F956_41D6_6910628043DA",
 "hfov": 360,
 "overlays": [
  "this.overlay_DD070AC8_C763_4ED2_41C9_24B475FBBEEE",
  "this.overlay_DDFC90E3_C76D_7AD6_41E6_FFEEF526FE90"
 ],
 "pitch": 0,
 "adjacentPanoramas": [
  {
   "backwardYaw": 127.75,
   "class": "AdjacentPanorama",
   "yaw": -0.72,
   "panorama": "this.panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB",
   "distance": 1
  },
  {
   "backwardYaw": -133.6,
   "class": "AdjacentPanorama",
   "yaw": 154.8,
   "panorama": "this.panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C",
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_t.jpg"
},
{
 "frames": [
  {
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_t.jpg"
  }
 ],
 "hfovMin": "150%",
 "label": "4BHK BEDROOM 01 2 33rd",
 "id": "panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42",
 "hfov": 360,
 "overlays": [
  "this.overlay_EAECF1EB_C72D_FAD6_41A8_B49AEB304111",
  "this.overlay_E91CF77E_C72C_C7AE_41E6_ED92117BB9B5"
 ],
 "pitch": 0,
 "adjacentPanoramas": [
  {
   "backwardYaw": 128.26,
   "class": "AdjacentPanorama",
   "yaw": -0.72,
   "panorama": "this.panorama_CD479071_C71C_D9B2_41D0_92945B278722",
   "distance": 1
  },
  {
   "backwardYaw": -131.59,
   "class": "AdjacentPanorama",
   "yaw": 148.02,
   "panorama": "this.panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060",
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_t.jpg"
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_F1C0E302_C71F_3F56_41D8_72D43BAE5F10",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 117.49,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_F2C6624A_C71F_39D1_41CB_B61FBD033EBB",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -52.25,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "frames": [
  {
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_t.jpg"
  }
 ],
 "hfovMin": "150%",
 "label": "4BHK BEDROOM 03 1 17th",
 "id": "panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0",
 "hfov": 360,
 "overlays": [
  "this.overlay_D201568E_C765_3951_41E8_132B3132B361"
 ],
 "pitch": 0,
 "adjacentPanoramas": [
  {
   "backwardYaw": -148.42,
   "class": "AdjacentPanorama",
   "yaw": -87.63,
   "panorama": "this.panorama_CD888F1A_C71C_C776_41E5_354715787DA9",
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_t.jpg"
},
{
 "frames": [
  {
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_t.jpg"
  }
 ],
 "hfovMin": "150%",
 "label": "4BHK BEDROOM 04 1 17th",
 "id": "panorama_CC131311_C71D_3F72_41C7_6DBD9418A942",
 "hfov": 360,
 "overlays": [
  "this.overlay_D29433BE_C765_3EAE_41D8_CC80272D951C",
  "this.overlay_D179CE94_C763_4971_41E1_4D5D0BD3A926"
 ],
 "pitch": 0,
 "adjacentPanoramas": [
  {
   "backwardYaw": 77.75,
   "class": "AdjacentPanorama",
   "yaw": 154.03,
   "panorama": "this.panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB",
   "distance": 1
  },
  {
   "backwardYaw": 68.51,
   "class": "AdjacentPanorama",
   "yaw": -21.56,
   "panorama": "this.panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335",
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_t.jpg"
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_F1D132F8_C71F_3EB1_41E5_E77683E03168",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 60.98,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_FA842EEF_C71C_C6AE_41DE_89FA80D47C34",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -108.61,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_F2BD8254_C71F_39F2_41D3_83331D0C3292",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -102.5,
  "pitch": 0
 }
},
{
 "frames": [
  {
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_t.jpg"
  }
 ],
 "hfovMin": "150%",
 "label": "4BHK BEDROOM 04 1 23rd",
 "id": "panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC",
 "hfov": 360,
 "overlays": [
  "this.overlay_D95E3B79_C764_CFB2_41CF_C88AFF6D4BC6",
  "this.overlay_D84AC366_C763_5FD1_41D2_AE1B94515E56"
 ],
 "pitch": 0,
 "adjacentPanoramas": [
  {
   "backwardYaw": 77.5,
   "class": "AdjacentPanorama",
   "yaw": 153.66,
   "panorama": "this.panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86",
   "distance": 1
  },
  {
   "backwardYaw": 69.51,
   "class": "AdjacentPanorama",
   "yaw": -19.17,
   "panorama": "this.panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6",
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_t.jpg"
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 166.56,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 126.87,
  "pitch": -9.04
 }
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_F9199F2F_C71C_C7AE_41A7_2A94E0F8FC1F",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 161.33,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_F11352C8_C71F_3ED2_41E2_E8CAD05DF315",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -158.11,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_F1A5E307_C71F_3F5E_41D4_646B18A9A632",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 53.7,
  "pitch": 0
 }
},
{
 "frames": [
  {
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86_t.jpg"
  }
 ],
 "hfovMin": "135%",
 "label": "4bhk living 02 23rd",
 "id": "panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86",
 "hfov": 360,
 "overlays": [
  "this.overlay_DF87A050_C767_D9F2_41B5_A747371BE693",
  "this.overlay_DE0068F1_C767_4AB2_41E8_311A365DEAB0",
  "this.overlay_DDD9E5FF_C765_5AAE_41E5_46C9CCEA06DE"
 ],
 "pitch": 0,
 "adjacentPanoramas": [
  {
   "backwardYaw": 21.64,
   "class": "AdjacentPanorama",
   "yaw": 93.83,
   "panorama": "this.panorama_CD93C521_C71D_3B53_41E8_25606B0344D0",
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB"
  },
  {
   "backwardYaw": 153.66,
   "class": "AdjacentPanorama",
   "yaw": 77.5,
   "panorama": "this.panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC",
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86_t.jpg"
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_F13CF2A8_C71F_3952_41C2_D36AB4E4EF92",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -26.34,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "frames": [
  {
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CC48A826_C71D_4951_41E7_7F28A52014B9_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CC48A826_C71D_4951_41E7_7F28A52014B9_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CC48A826_C71D_4951_41E7_7F28A52014B9_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CC48A826_C71D_4951_41E7_7F28A52014B9_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CC48A826_C71D_4951_41E7_7F28A52014B9_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CC48A826_C71D_4951_41E7_7F28A52014B9_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CC48A826_C71D_4951_41E7_7F28A52014B9_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CC48A826_C71D_4951_41E7_7F28A52014B9_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CC48A826_C71D_4951_41E7_7F28A52014B9_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CC48A826_C71D_4951_41E7_7F28A52014B9_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CC48A826_C71D_4951_41E7_7F28A52014B9_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CC48A826_C71D_4951_41E7_7F28A52014B9_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CC48A826_C71D_4951_41E7_7F28A52014B9_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CC48A826_C71D_4951_41E7_7F28A52014B9_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CC48A826_C71D_4951_41E7_7F28A52014B9_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CC48A826_C71D_4951_41E7_7F28A52014B9_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CC48A826_C71D_4951_41E7_7F28A52014B9_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CC48A826_C71D_4951_41E7_7F28A52014B9_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_CC48A826_C71D_4951_41E7_7F28A52014B9_t.jpg"
  }
 ],
 "hfovMin": "135%",
 "label": "4bhk living 01 17th",
 "id": "panorama_CC48A826_C71D_4951_41E7_7F28A52014B9",
 "hfov": 360,
 "overlays": [
  "this.overlay_C9502109_C72D_3B52_41E6_EA33AED203C6",
  "this.overlay_C8B50F54_C72F_47F2_41BD_3D4C2E212738",
  "this.overlay_D54F99DC_C72F_CAF2_41E3_249E41049022",
  "this.overlay_D7048D5C_C72C_CBF1_41E2_9CEB980C06AF"
 ],
 "pitch": 0,
 "adjacentPanoramas": [
  {
   "backwardYaw": -59.5,
   "class": "AdjacentPanorama",
   "yaw": -20.98,
   "panorama": "this.panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C",
   "distance": 1
  },
  {
   "backwardYaw": -126.3,
   "class": "AdjacentPanorama",
   "yaw": -169.89,
   "panorama": "this.panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB",
   "distance": 1
  },
  {
   "backwardYaw": -142.41,
   "class": "AdjacentPanorama",
   "yaw": 30.15,
   "panorama": "this.panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045",
   "distance": 1
  },
  {
   "backwardYaw": 0.29,
   "class": "AdjacentPanorama",
   "yaw": 127.75,
   "panorama": "this.panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2",
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_CC48A826_C71D_4951_41E7_7F28A52014B9_t.jpg"
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_F2934269_C71F_39D2_41E5_426126B262F3",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -111.49,
  "pitch": 0
 }
},
{
 "frames": [
  {
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_t.jpg"
  }
 ],
 "hfovMin": "150%",
 "label": "4BHK BEDROOM 01 1 33rd",
 "id": "panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060",
 "hfov": 360,
 "overlays": [
  "this.overlay_E9099FDF_C72F_C6EE_41E3_A646B2C2340D"
 ],
 "pitch": 0,
 "adjacentPanoramas": [
  {
   "backwardYaw": 148.02,
   "class": "AdjacentPanorama",
   "yaw": -131.59,
   "panorama": "this.panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42",
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_t.jpg"
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "frames": [
  {
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_t.jpg"
  }
 ],
 "hfovMin": "150%",
 "label": "4BHK BEDROOM 04 2 17th",
 "id": "panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335",
 "hfov": 360,
 "overlays": [
  "this.overlay_D10180AB_C763_D956_41E1_17A33D3BEE1E"
 ],
 "pitch": 0,
 "adjacentPanoramas": [
  {
   "backwardYaw": -21.56,
   "class": "AdjacentPanorama",
   "yaw": 68.51,
   "panorama": "this.panorama_CC131311_C71D_3F72_41C7_6DBD9418A942",
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_t.jpg"
},
{
 "frames": [
  {
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_t.jpg"
  }
 ],
 "hfovMin": "150%",
 "label": "4BHK BEDROOM 02 2 17th",
 "id": "panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045",
 "hfov": 360,
 "overlays": [
  "this.overlay_D464C36F_C76D_5FAF_41D8_35D099FAD98B",
  "this.overlay_D4E3A43C_C76F_59B1_41D0_FA262DAB39CB"
 ],
 "pitch": 0,
 "adjacentPanoramas": [
  {
   "backwardYaw": 55.82,
   "class": "AdjacentPanorama",
   "yaw": -23.19,
   "panorama": "this.panorama_CC175683_C71F_5956_41AA_704EB81E1F05",
   "distance": 1
  },
  {
   "backwardYaw": 30.15,
   "class": "AdjacentPanorama",
   "yaw": -142.41,
   "panorama": "this.panorama_CC48A826_C71D_4951_41E7_7F28A52014B9",
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_t.jpg"
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "frames": [
  {
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD_t.jpg"
  }
 ],
 "hfovMin": "135%",
 "label": "4bhk living 02 33rd",
 "id": "panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD",
 "hfov": 360,
 "overlays": [
  "this.overlay_EC843EC7_C724_C6DF_41E4_78AEC11AB30A",
  "this.overlay_EBD3DBCF_C723_4EEE_41D3_4E82F6F873AE",
  "this.overlay_E9586F13_C72C_C776_41D2_741B38E3831E"
 ],
 "pitch": 0,
 "adjacentPanoramas": [
  {
   "backwardYaw": -167,
   "class": "AdjacentPanorama",
   "yaw": -121.4,
   "panorama": "this.panorama_CD479071_C71C_D9B2_41D0_92945B278722",
   "distance": 1
  },
  {
   "backwardYaw": 152.65,
   "class": "AdjacentPanorama",
   "yaw": 77.5,
   "panorama": "this.panorama_EBE3DC98_C723_4972_41E0_39A7A1000045",
   "distance": 1
  },
  {
   "backwardYaw": 21.64,
   "class": "AdjacentPanorama",
   "yaw": 94.33,
   "panorama": "this.panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506",
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD_t.jpg"
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_CD973440_C71F_79D2_41CE_832903CFC20A_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "frames": [
  {
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_t.jpg"
  }
 ],
 "hfovMin": "150%",
 "label": "4BHK BEDROOM 03 2 33rd",
 "id": "panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506",
 "hfov": 360,
 "overlays": [
  "this.overlay_F7CC04EB_C723_5AD6_41D4_F9DE6E7EE7BF",
  "this.overlay_F6F55B77_C723_4FBE_41D4_D6F2BBFF046B"
 ],
 "pitch": 0,
 "adjacentPanoramas": [
  {
   "backwardYaw": -77.83,
   "class": "AdjacentPanorama",
   "yaw": -148.93,
   "panorama": "this.panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B",
   "distance": 1
  },
  {
   "backwardYaw": 94.33,
   "class": "AdjacentPanorama",
   "yaw": 21.64,
   "panorama": "this.panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD",
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_t.jpg"
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_F04C7337_C71F_3FBE_41E4_368FFDA4D622",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 43.63,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_CC175683_C71F_5956_41AA_704EB81E1F05_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_F965FEFF_C71C_C6AE_41E3_E59E42B96C74",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -27.35,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_CD732023_C71F_F956_41D6_6910628043DA_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 171.84,
  "pitch": -4.02
 }
},
{
 "frames": [
  {
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_t.jpg"
  }
 ],
 "hfovMin": "150%",
 "label": "4BHK BEDROOM 03 1 33rd",
 "id": "panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B",
 "hfov": 360,
 "overlays": [
  "this.overlay_F5309816_C725_4971_41DC_62B6061471DF"
 ],
 "pitch": 0,
 "adjacentPanoramas": [
  {
   "backwardYaw": -148.93,
   "class": "AdjacentPanorama",
   "yaw": -77.83,
   "panorama": "this.panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506",
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_t.jpg"
},
{
 "frames": [
  {
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_t.jpg"
  }
 ],
 "hfovMin": "150%",
 "label": "4BHK BEDROOM 02 2 33rd",
 "id": "panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545",
 "hfov": 360,
 "overlays": [
  "this.overlay_E994C697_C72F_797F_41D3_1180D963962C",
  "this.overlay_E8B86196_C72D_7B7E_41D9_E9ACE1C1D537"
 ],
 "pitch": 0,
 "adjacentPanoramas": [
  {
   "backwardYaw": 28.27,
   "class": "AdjacentPanorama",
   "yaw": -143.41,
   "panorama": "this.panorama_CD479071_C71C_D9B2_41D0_92945B278722",
   "distance": 1
  },
  {
   "backwardYaw": 71.39,
   "class": "AdjacentPanorama",
   "yaw": -22.69,
   "panorama": "this.panorama_CD973440_C71F_79D2_41CE_832903CFC20A",
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_t.jpg"
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_FA96BEE0_C71C_C6D1_41C5_4E9A0CF632EE",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -151.73,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_F0D64376_C71F_3FBE_41E5_5BB84C1D9C07",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -51.74,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_F95A1F0F_C71C_C76E_41E1_C7713EE7EFF7",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -158.36,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_F9745EEF_C71C_C6AE_41E7_4CAB6130AF1D",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 13,
  "pitch": 0
 }
},
{
 "frames": [
  {
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_t.jpg"
  }
 ],
 "hfovMin": "150%",
 "label": "4BHK BEDROOM 04 2 33rd",
 "id": "panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05",
 "hfov": 360,
 "overlays": [
  "this.overlay_F4767B1F_C727_4F6F_41DB_8ED192ED33D1"
 ],
 "pitch": 0,
 "adjacentPanoramas": [
  {
   "backwardYaw": -18.67,
   "class": "AdjacentPanorama",
   "yaw": 70.89,
   "panorama": "this.panorama_EBE3DC98_C723_4972_41E0_39A7A1000045",
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_t.jpg"
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_F2E4023A_C71F_39B6_41D9_03F5788B6820",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 179.28,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_F29D9269_C71F_39D2_41E1_4CF230416109",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -102.25,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_F26331CA_C71F_3AD6_41E2_2E06BFF868B2",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -111.62,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_FAA6AEE0_C71C_C6D1_41E5_619A7BC49E51",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 31.07,
  "pitch": 0
 }
},
{
 "mouseControlMode": "drag_acceleration",
 "viewerArea": "this.MainViewer",
 "displayPlaybackBar": true,
 "gyroscopeEnabled": true,
 "class": "PanoramaPlayer",
 "id": "MainViewerPanoramaPlayer",
 "touchControlMode": "drag_rotation",
 "gyroscopeVerticalDraggingEnabled": true
},
{
 "frames": [
  {
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_t.jpg"
  }
 ],
 "hfovMin": "150%",
 "label": "4BHK BEDROOM 01 1 17th",
 "id": "panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA",
 "hfov": 360,
 "overlays": [
  "this.overlay_D5B45B26_C76D_CF5E_41D0_7E370B2F5BD4"
 ],
 "pitch": 0,
 "adjacentPanoramas": [
  {
   "backwardYaw": 155.88,
   "class": "AdjacentPanorama",
   "yaw": -138.88,
   "panorama": "this.panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2",
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_t.jpg"
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_F166D293_C71F_3976_41E0_38D4673931AE",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -25.2,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "frames": [
  {
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 4,
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_t.jpg"
  }
 ],
 "hfovMin": "150%",
 "label": "4BHK BEDROOM 01 1 23rd",
 "id": "panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C",
 "hfov": 360,
 "overlays": [
  "this.overlay_DDB914AF_C76D_7AAE_41DD_FD246BE7004B"
 ],
 "pitch": 0,
 "adjacentPanoramas": [
  {
   "backwardYaw": 154.8,
   "class": "AdjacentPanorama",
   "yaw": -133.6,
   "panorama": "this.panorama_CD732023_C71F_F956_41D6_6910628043DA",
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_t.jpg"
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_F005E366_C71F_3FDE_41D6_6099BCA2C3BE",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -103.63,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_F24201EB_C71F_3AD6_41E7_21D725FA740E",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -124.18,
  "pitch": 0
 }
},
{
 "vrPointerSelectionColor": "#FF6600",
 "toolTipTextShadowOpacity": 0,
 "toolTipFontFamily": "Arial",
 "id": "MainViewer",
 "paddingLeft": 0,
 "paddingBottom": 0,
 "playbackBarHeadShadowColor": "#000000",
 "progressOpacity": 1,
 "progressRight": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "progressBarBackgroundColorDirection": "vertical",
 "vrPointerSelectionTime": 2000,
 "firstTransitionDuration": 0,
 "width": "100%",
 "minHeight": 50,
 "borderSize": 0,
 "toolTipFontColor": "#606060",
 "playbackBarHeadShadow": true,
 "displayTooltipInTouchScreens": true,
 "progressBottom": 0,
 "playbackBarOpacity": 1,
 "toolTipBackgroundColor": "#F6F6F6",
 "progressBackgroundOpacity": 1,
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "minWidth": 100,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "progressBarOpacity": 1,
 "progressBorderSize": 0,
 "vrPointerColor": "#FFFFFF",
 "playbackBarHeadShadowOpacity": 0.7,
 "toolTipBorderSize": 1,
 "toolTipPaddingRight": 6,
 "playbackBarBorderColor": "#FFFFFF",
 "height": "100%",
 "progressBorderRadius": 0,
 "toolTipPaddingTop": 4,
 "shadow": false,
 "toolTipPaddingLeft": 6,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "borderRadius": 0,
 "toolTipDisplayTime": 600,
 "playbackBarHeadShadowBlurRadius": 3,
 "playbackBarLeft": 0,
 "paddingTop": 0,
 "progressBackgroundColorRatios": [
  0
 ],
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "toolTipBorderRadius": 3,
 "transitionDuration": 500,
 "playbackBarHeadHeight": 15,
 "progressBackgroundColorDirection": "vertical",
 "playbackBarHeadShadowHorizontalLength": 0,
 "progressBarBorderColor": "#000000",
 "progressBorderColor": "#000000",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "playbackBarBottom": 5,
 "toolTipShadowSpread": 0,
 "playbackBarHeadOpacity": 1,
 "toolTipBorderColor": "#767676",
 "paddingRight": 0,
 "playbackBarHeadShadowVerticalLength": 0,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipShadowHorizontalLength": 0,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipOpacity": 1,
 "toolTipShadowVerticalLength": 0,
 "toolTipFontSize": "1.11vmin",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "toolTipShadowBlurRadius": 3,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarRight": 0,
 "toolTipTextShadowBlurRadius": 3,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "class": "ViewerArea",
 "toolTipPaddingBottom": 4,
 "transitionMode": "blending",
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 0,
 "playbackBarProgressBorderRadius": 0,
 "toolTipShadowColor": "#333333",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "toolTipFontStyle": "normal",
 "progressLeft": 0,
 "toolTipShadowOpacity": 1,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "data": {
  "name": "Main Viewer"
 },
 "playbackBarBorderSize": 0,
 "propagateClick": false,
 "playbackBarBackgroundOpacity": 1
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CC48A826_C71D_4951_41E7_7F28A52014B9, this.camera_F153D299_C71F_3972_41E5_BAB2C2251150); this.mainPlayList.set('selectedIndex', 0)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_D1FFD3DD_C77D_5EF2_41CE_89845FEA3E36",
   "yaw": -59.5,
   "pitch": -35.86,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 6.79
  }
 ],
 "useHandCursor": true,
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
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -35.86
  }
 ],
 "id": "overlay_D6C3F8D5_C723_4AF3_41E1_A8B34E8F3123",
 "enabledInCardboard": true
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932, this.camera_F13282B9_C71F_3EB3_41E3_674757C47BB2); this.mainPlayList.set('selectedIndex', 22)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "items": [
  {
   "yaw": -142.03,
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
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 15.65
  }
 ],
 "useHandCursor": true,
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
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 0.03
  }
 ],
 "id": "overlay_E3C0EB9C_C727_CF72_41D8_2929BE9FB4EE",
 "enabledInCardboard": true
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F, this.camera_F12602C3_C71F_3ED7_41D0_E4F92900FAFF); this.mainPlayList.set('selectedIndex', 28)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 01a"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_FAFD8EA1_C71C_C952_41D8_373C2A3BC59E",
   "yaw": -21.43,
   "pitch": -26.82,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 16.23
  }
 ],
 "useHandCursor": true,
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
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -26.82
  }
 ],
 "id": "overlay_E2CC1B58_C725_4FF1_41E7_2F6766A1B20D",
 "enabledInCardboard": true
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558, this.camera_F1EA82E8_C71F_3ED2_41E5_1602AD6F35CA); this.mainPlayList.set('selectedIndex', 27)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "items": [
  {
   "yaw": 30.28,
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
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 12.58
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 30.28,
   "hfov": 12.58,
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
 ],
 "id": "overlay_E77541FB_C727_7AB6_41E2_71A4F3A251EC",
 "enabledInCardboard": true
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01, this.camera_F1DF32F2_C71F_3EB6_41CC_2A53FB7C9221); this.mainPlayList.set('selectedIndex', 25)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "items": [
  {
   "yaw": 128.01,
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
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 10.06
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 128.01,
   "hfov": 10.06,
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
 ],
 "id": "overlay_E66DCEAD_C727_4953_41E4_4338D4DA1A80",
 "enabledInCardboard": true
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A, this.camera_F1C0E302_C71F_3F56_41D8_72D43BAE5F10); this.mainPlayList.set('selectedIndex', 24)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01 Left"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_FA00CE9F_C71C_C96E_41CB_FD5F6C56B63D",
   "yaw": -20.22,
   "pitch": 0.82,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 7.54
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -20.22,
   "hfov": 7.54,
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
 ],
 "id": "overlay_E57D9766_C725_47DE_41E4_4EAD320D7E97",
 "enabledInCardboard": true
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CD47441A_C71C_F976_41E5_56E16AD8E357, this.camera_F1D132F8_C71F_3EB1_41E5_E77683E03168); this.mainPlayList.set('selectedIndex', 23)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 01a"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_FA006EA1_C71C_C952_41E3_EEF6B4FA49B4",
   "yaw": -166.12,
   "pitch": -29.06,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 14.16
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -166.12,
   "hfov": 14.16,
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
 ],
 "id": "overlay_E6FF7EBA_C723_46B1_41E8_B0C4C865F516",
 "enabledInCardboard": true
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545, this.camera_F2FDC22A_C71F_3956_41D3_9D6F0BBB0CA2); this.mainPlayList.set('selectedIndex', 39)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "items": [
  {
   "yaw": 28.27,
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
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 12.07
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 28.27,
   "hfov": 12.07,
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
 ],
 "id": "overlay_EEDAB568_C725_FBD2_41DB_8D04CB4292A1",
 "enabledInCardboard": true
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42, this.camera_F2E4023A_C71F_39B6_41D9_03F5788B6820); this.mainPlayList.set('selectedIndex', 37)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "items": [
  {
   "yaw": 128.26,
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
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 9.06
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 128.26,
   "hfov": 9.06,
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
 ],
 "id": "overlay_EDFCD5B0_C724_DAB2_41D6_0E77907C4F3F",
 "enabledInCardboard": true
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC, this.camera_F2F0A22A_C71F_3956_41E8_81A878C590AA); this.mainPlayList.set('selectedIndex', 36)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01 Left"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_FAF94EA1_C71C_C952_41E4_0731DD7884F3",
   "yaw": -20.22,
   "pitch": -0.19,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 7.54
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -20.22,
   "hfov": 7.54,
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
 ],
 "id": "overlay_EC51FEB1_C727_46B2_41B8_83F109FE0A5A",
 "enabledInCardboard": true
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD, this.camera_F204321A_C71F_3976_41E3_A3308E44A841); this.mainPlayList.set('selectedIndex', 35)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 01a"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_FAF8DEA1_C71C_C952_41D9_3F5AF1CE979B",
   "yaw": -167,
   "pitch": -27.17,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 10.61
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -167,
   "hfov": 10.61,
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
 ],
 "id": "overlay_ECD21C73_C725_C9B6_4192_D031F772D6EA",
 "enabledInCardboard": true
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A, this.camera_F09D1397_C71F_3F7F_41D0_7CB03CE73714); this.mainPlayList.set('selectedIndex', 29)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 01a"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_FAFFEEA1_C71C_C952_41E8_6B492A5DBA36",
   "yaw": -82.1,
   "pitch": -38.76,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 15.16
  }
 ],
 "useHandCursor": true,
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
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -38.76
  }
 ],
 "id": "overlay_E039B42F_C73C_D9AE_4179_6CED54A79A5C",
 "enabledInCardboard": true
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CD479071_C71C_D9B2_41D0_92945B278722, this.camera_FF7143B6_C71F_3EB1_41D3_859A899B00B4); this.mainPlayList.set('selectedIndex', 34)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_FAFAFEA9_C71C_C952_41CA_4FFF116D99CA",
   "yaw": -63.14,
   "pitch": -28.7,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 11.09
  }
 ],
 "useHandCursor": true,
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
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -28.7
  }
 ],
 "id": "overlay_F418FFB4_C727_46B1_41E3_7157AAB75A6C",
 "enabledInCardboard": true
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4, this.camera_F0E6F376_C71F_3FBE_41DC_1506264CAAB0); this.mainPlayList.set('selectedIndex', 16)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 01a"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_FA07DE90_C71C_C971_41A0_4218535C0002",
   "yaw": 68.88,
   "pitch": -42.77,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 14.27
  }
 ],
 "useHandCursor": true,
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
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -42.77
  }
 ],
 "id": "overlay_DB599724_C763_4752_41D6_A0FA163F689B",
 "enabledInCardboard": true
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4, this.camera_F9280F2F_C71C_C7AE_41B9_C662FB698621); this.mainPlayList.set('selectedIndex', 16)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "items": [
  {
   "yaw": 29.15,
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
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 11.31
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 29.15,
   "hfov": 11.31,
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
 ],
 "id": "overlay_D079CAD6_C77D_CEFE_41DD_ABBE2AA0167E",
 "enabledInCardboard": true
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CD732023_C71F_F956_41D6_6910628043DA, this.camera_F94A5F19_C71C_C772_41E6_AABB9E5DEB55); this.mainPlayList.set('selectedIndex', 14)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "items": [
  {
   "yaw": 127.75,
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
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 9.06
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 127.75,
   "hfov": 9.06,
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
 ],
 "id": "overlay_DF5FBBAA_C77C_CF56_41E7_7C881B931889",
 "enabledInCardboard": true
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1, this.camera_F93BCF1F_C71C_C76E_418D_0F8D189DB31A); this.mainPlayList.set('selectedIndex', 13)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01 Left"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_FA0BAE90_C71C_C971_41E0_63F6F161FC76",
   "yaw": -21.73,
   "pitch": 2.58,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 7.53
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -21.73,
   "hfov": 7.53,
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
 ],
 "id": "overlay_DF1B664B_C763_59D6_41D4_1CCBA4B7384E",
 "enabledInCardboard": true
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 01a"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_FA0B4E90_C71C_C971_41D3_88FDD6887B44",
   "yaw": -167.13,
   "pitch": -23.66,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 11.62
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -167.13,
   "hfov": 11.62,
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
 ],
 "id": "overlay_DFF6DAC7_C765_4EDE_41D5_CD99DAE5DE58",
 "enabledInCardboard": true
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CD47441A_C71C_F976_41E5_56E16AD8E357, this.camera_F909AF3F_C71C_C7AE_41E2_08E927F62DF8); this.mainPlayList.set('selectedIndex', 23)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "items": [
  {
   "yaw": 154.28,
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
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 15.86
  }
 ],
 "useHandCursor": true,
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
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 15
     }
    ]
   },
   "pitch": 3.92
  }
 ],
 "id": "overlay_E0AC7D99_C73D_CB72_41E2_CDE435C74BDD",
 "enabledInCardboard": true
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD, this.camera_F26331CA_C71F_3AD6_41E2_2E06BFF868B2); this.mainPlayList.set('selectedIndex', 32)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 01a"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_FAFEFEA1_C71C_C952_41C0_6B0A32F7BF3D",
   "yaw": -19.04,
   "pitch": -26.82,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 13.76
  }
 ],
 "useHandCursor": true,
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
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -26.82
  }
 ],
 "id": "overlay_EFD00FA6_C73C_C75E_41E0_8DE91C303B0D",
 "enabledInCardboard": true
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A, this.camera_F11352C8_C71F_3ED2_41E2_E8CAD05DF315); this.mainPlayList.set('selectedIndex', 29)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01 Left"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_FA00DEA1_C71C_C952_41E2_F23785FC8BDC",
   "yaw": 76.37,
   "pitch": 0.06,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 6.28
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 76.37,
   "hfov": 6.28,
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
 ],
 "id": "overlay_E69088C4_C72C_CAD2_41E2_67849E970973",
 "enabledInCardboard": true
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD, this.camera_F11D52C8_C71F_3ED2_41C7_4B15F9043073); this.mainPlayList.set('selectedIndex', 31)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01 Right"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_FA004EA1_C71C_C952_41C3_8632FF40FA9D",
   "yaw": 94.08,
   "pitch": -0.44,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 7.54
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 94.08,
   "hfov": 7.54,
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
 ],
 "id": "overlay_E5D3EE61_C72D_49D2_41E0_D1B634887F8E",
 "enabledInCardboard": true
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932, this.camera_F107A2D8_C71F_3EF1_41E8_4A2843648F86); this.mainPlayList.set('selectedIndex', 22)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 01a"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_FA03EEA1_C71C_C952_41BF_5073535470B3",
   "yaw": -119.02,
   "pitch": -28.93,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 9.56
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -119.02,
   "hfov": 9.56,
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
 ],
 "id": "overlay_E44921C1_C72D_3AD3_41D0_85751F7FA73A",
 "enabledInCardboard": true
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB, this.camera_F079E327_C71F_3F5E_41E5_8F085A215574); this.mainPlayList.set('selectedIndex', 11)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "items": [
  {
   "yaw": -143.41,
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
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 16.89
  }
 ],
 "useHandCursor": true,
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
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 2.16
  }
 ],
 "id": "overlay_DC659AFB_C76F_4EB6_41D5_0F1877D4D037",
 "enabledInCardboard": true
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751, this.camera_F06B9331_C71F_3FB2_41DF_42285E58C032); this.mainPlayList.set('selectedIndex', 17)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 01a"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_FA044E90_C71C_C971_41E5_5531B3116D9D",
   "yaw": -14.77,
   "pitch": -31.97,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 16.49
  }
 ],
 "useHandCursor": true,
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
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -31.97
  }
 ],
 "id": "overlay_DCF81359_C76F_7FF3_41A8_62F50E047FA0",
 "enabledInCardboard": true
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC, this.camera_F24C91E6_C71F_3AD1_41E1_8205C1C88305); this.mainPlayList.set('selectedIndex', 20)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 01a"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_FA01CE9F_C71C_C96E_41C5_FF2C26F6F9F4",
   "yaw": 69.51,
   "pitch": -32.59,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 9.82
  }
 ],
 "useHandCursor": true,
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
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -32.59
  }
 ],
 "id": "overlay_D8D0AEBD_C71D_46B2_41E2_77FAFEC5B3BD",
 "enabledInCardboard": true
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CD47441A_C71C_F976_41E5_56E16AD8E357, this.camera_F005E366_C71F_3FDE_41D6_6099BCA2C3BE); this.mainPlayList.set('selectedIndex', 23)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "items": [
  {
   "yaw": 21.89,
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
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 10.86
  }
 ],
 "useHandCursor": true,
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
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 2.9
  }
 ],
 "id": "overlay_E11B8401_C724_F952_41BA_B115171D0330",
 "enabledInCardboard": true
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3, this.camera_F0F54370_C71F_3FB2_4157_33158F557BB8); this.mainPlayList.set('selectedIndex', 30)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 01a"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_FAFC5EA1_C71C_C952_41E0_BCC489328B91",
   "yaw": -148.17,
   "pitch": -45.29,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 13.68
  }
 ],
 "useHandCursor": true,
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
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -45.29
  }
 ],
 "id": "overlay_E05F9DD6_C723_CAF1_41E7_95CA81350DF9",
 "enabledInCardboard": true
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 18)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 01a"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_FA06DE9F_C71C_C96E_41E1_A30D63F2FB79",
   "yaw": -86.37,
   "pitch": -39.26,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 15.05
  }
 ],
 "useHandCursor": true,
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
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -39.26
  }
 ],
 "id": "overlay_DA67D643_C765_39D6_41E7_BD2D534FD43E",
 "enabledInCardboard": true
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545, this.camera_F2A6625A_C71F_39F1_41C8_133B14D39F50); this.mainPlayList.set('selectedIndex', 39)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 01a"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_FAF44EA9_C71C_C952_41CD_FB91195244B1",
   "yaw": 71.39,
   "pitch": -43.52,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 14.1
  }
 ],
 "useHandCursor": true,
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
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -43.52
  }
 ],
 "id": "overlay_E8B6B81F_C72D_496E_41E6_150256507011",
 "enabledInCardboard": true
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932, this.camera_F05A7337_C71F_3FBE_41CA_5FA849FCD729); this.mainPlayList.set('selectedIndex', 22)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "items": [
  {
   "yaw": 1.29,
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
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 10.87
  }
 ],
 "useHandCursor": true,
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
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 0.91
  }
 ],
 "id": "overlay_E4AC823C_C723_F9B2_41B4_39B29FEEA91C",
 "enabledInCardboard": true
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE, this.camera_F04C7337_C71F_3FBE_41E4_368FFDA4D622); this.mainPlayList.set('selectedIndex', 26)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 01a"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_FA02CEA1_C71C_C952_41D9_C7699FA42E28",
   "yaw": 144.5,
   "pitch": -44.78,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 13.8
  }
 ],
 "useHandCursor": true,
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
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -44.78
  }
 ],
 "id": "overlay_E33D35E2_C723_3AD1_41A1_22D3C41AFB56",
 "enabledInCardboard": true
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD, this.camera_F1738289_C71F_3953_41E3_B04BF9E67BD6); this.mainPlayList.set('selectedIndex', 35)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "items": [
  {
   "yaw": 152.65,
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
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 13.63
  }
 ],
 "useHandCursor": true,
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
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 1.66
  }
 ],
 "id": "overlay_F4E4001F_C725_596E_41E0_DD5EA526DD91",
 "enabledInCardboard": true
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05, this.camera_F17C4279_C71F_39B2_41E6_0F1F0EE7ECD3); this.mainPlayList.set('selectedIndex', 44)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 01a"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_FAF78EA9_C71C_C952_41A5_6A3A0AEBEC10",
   "yaw": -18.67,
   "pitch": -26.57,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 11.77
  }
 ],
 "useHandCursor": true,
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
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -26.57
  }
 ],
 "id": "overlay_F3F318C8_C723_4AD2_41E2_333E3532C07C",
 "enabledInCardboard": true
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CC48A826_C71D_4951_41E7_7F28A52014B9, this.camera_F2C6624A_C71F_39D1_41CB_B61FBD033EBB); this.mainPlayList.set('selectedIndex', 0)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "items": [
  {
   "yaw": 0.29,
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
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 10.87
  }
 ],
 "useHandCursor": true,
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
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 0.4
  }
 ],
 "id": "overlay_D51089C5_C765_CAD2_41E5_192F51616448",
 "enabledInCardboard": true
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA, this.camera_F2D0D24A_C71F_39D1_4192_4CFF774A9BE9); this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 01a"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_D1FE33E7_C77D_5EDE_41D2_061D00B2B4AE",
   "yaw": 155.88,
   "pitch": -45.77,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 12.27
  }
 ],
 "useHandCursor": true,
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
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -45.77
  }
 ],
 "id": "overlay_D5FA2C1E_C764_C971_41E4_AEEDE47EBAA0",
 "enabledInCardboard": true
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB, this.camera_F286A279_C71F_39B2_41B0_E0A7C0F6B25F); this.mainPlayList.set('selectedIndex', 11)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_FA05CE90_C71C_C971_41DA_6F68C88587BE",
   "yaw": -58.37,
   "pitch": -32.85,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 9.36
  }
 ],
 "useHandCursor": true,
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
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -32.85
  }
 ],
 "id": "overlay_DD3041EE_C764_DAAE_41E6_5D3D4684B50F",
 "enabledInCardboard": true
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558, this.camera_F1F892D8_C71F_3EF1_41D7_E4CB35F1710F); this.mainPlayList.set('selectedIndex', 27)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 01a"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_FAFD0EA1_C71C_C952_41D1_EB8B49E98B69",
   "yaw": 78.93,
   "pitch": -45.28,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 13.68
  }
 ],
 "useHandCursor": true,
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
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -45.28
  }
 ],
 "id": "overlay_E167051F_C725_5B6F_41E8_EC2A8AF34DDA",
 "enabledInCardboard": true
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045, this.camera_F03FB347_C71F_3FDE_41CA_EBFFB328541E); this.mainPlayList.set('selectedIndex', 5)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 01a"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_D1F953E7_C77D_5EDE_41B3_BBC8AE666EFB",
   "yaw": 55.82,
   "pitch": -38.5,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 15.21
  }
 ],
 "useHandCursor": true,
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
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -38.5
  }
 ],
 "id": "overlay_D4F9B791_C76F_4773_41B6_B1727AC576AD",
 "enabledInCardboard": true
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932, this.camera_F15C5299_C71F_3972_41E3_395ED5F18115); this.mainPlayList.set('selectedIndex', 22)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_FA037EA1_C71C_C952_41C7_D133F5C1BD46",
   "yaw": -62.51,
   "pitch": -25.81,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 14.32
  }
 ],
 "useHandCursor": true,
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
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -25.81
  }
 ],
 "id": "overlay_E4FA5D36_C72C_CBBE_41DE_84376FB29EF5",
 "enabledInCardboard": true
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86, this.camera_F0AAF397_C71F_3F7F_41DC_55CDB271673C); this.mainPlayList.set('selectedIndex', 12)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "items": [
  {
   "yaw": 21.64,
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
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 10.85
  }
 ],
 "useHandCursor": true,
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
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 18
     }
    ]
   },
   "pitch": 3.53
  }
 ],
 "id": "overlay_DB374A8C_C765_4952_41E1_A2E190D5388B",
 "enabledInCardboard": true
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 8)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 01a"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_FA073E9F_C71C_C96E_4198_7EA928FE7C01",
   "yaw": -141.39,
   "pitch": -50.82,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 12.28
  }
 ],
 "useHandCursor": true,
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
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -50.82
  }
 ],
 "id": "overlay_D912F139_C767_5BB2_41DE_1B6920A1E6C5",
 "enabledInCardboard": true
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CC131311_C71D_3F72_41C7_6DBD9418A942, this.camera_F2253209_C71F_3953_416D_B676A65CC600); this.mainPlayList.set('selectedIndex', 9)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01 Left"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_D1FF13DD_C77D_5EF2_41CF_2558FD0159CA",
   "yaw": 77.75,
   "pitch": -1.7,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 7.53
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 77.75,
   "hfov": 7.53,
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
 ],
 "id": "overlay_D77E9814_C72D_C971_41D3_F1C7EEC185B4",
 "enabledInCardboard": true
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CD888F1A_C71C_C776_41E5_354715787DA9, this.camera_F218120C_C71F_3952_41E1_E14D7DECE8FA); this.mainPlayList.set('selectedIndex', 7)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01 Right"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_D1FF53DD_C77D_5EF2_41DF_0CE4BBD4FAA4",
   "yaw": 92.83,
   "pitch": -1.95,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 7.53
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 92.83,
   "hfov": 7.53,
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
 ],
 "id": "overlay_D6593DFD_C725_CAB3_41E1_22E863C59B7A",
 "enabledInCardboard": true
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CC48A826_C71D_4951_41E7_7F28A52014B9, this.camera_F211621A_C71F_3976_41E2_9FBD48AB97A3); this.mainPlayList.set('selectedIndex', 0)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 01a"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_D1FF93DD_C77D_5EF2_41CB_8856CCC91593",
   "yaw": -126.3,
   "pitch": -24.53,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 9.94
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -126.3,
   "hfov": 9.94,
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
 ],
 "id": "overlay_D689F985_C723_4B53_41E0_EF19CAA46BA5",
 "enabledInCardboard": true
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD, this.camera_F0101356_C71F_3FFE_41E4_FB3D63DE41FA); this.mainPlayList.set('selectedIndex', 31)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 01a"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_FAFE9EA1_C71C_C952_41DA_D7061FCCB4FA",
   "yaw": 68.38,
   "pitch": -32.72,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 10.01
  }
 ],
 "useHandCursor": true,
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
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -32.72
  }
 ],
 "id": "overlay_EE27537F_C723_5FAE_41E1_DBA13BA4CC54",
 "enabledInCardboard": true
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB, this.camera_F259E1DB_C71F_3AF7_41C5_454744075055); this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "items": [
  {
   "yaw": 21.77,
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
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 10.62
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 21.77,
   "hfov": 10.62,
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
 ],
 "id": "overlay_D3646773_C765_47B6_41E0_73AF92AE0B87",
 "enabledInCardboard": true
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0, this.camera_F25CC1CA_C71F_3AD6_41A4_EB03C92EC2AB); this.mainPlayList.set('selectedIndex', 8)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 01a"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_D1F9D3E7_C77D_5EDE_41D3_15BE236E2A6A",
   "yaw": -148.42,
   "pitch": -47.8,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 13.06
  }
 ],
 "useHandCursor": true,
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
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -47.8
  }
 ],
 "id": "overlay_D246BEC5_C767_C6D3_417F_B7C47770AE7C",
 "enabledInCardboard": true
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01, this.camera_F0BBA386_C71F_3F5E_41E3_A28C774DE755); this.mainPlayList.set('selectedIndex', 25)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 01a"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_FA024EA1_C71C_C952_41E6_04D5EC23BC22",
   "yaw": -136.37,
   "pitch": -38,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 15.32
  }
 ],
 "useHandCursor": true,
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
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -38
  }
 ],
 "id": "overlay_E31F4E35_C725_49B2_41E3_75B373DD479F",
 "enabledInCardboard": true
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB, this.camera_FABC3EBF_C71C_C6AE_41C9_BD0E3F001F06); this.mainPlayList.set('selectedIndex', 11)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "items": [
  {
   "yaw": -0.72,
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
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 10.87
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -0.72,
   "hfov": 10.87,
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
 ],
 "id": "overlay_DD070AC8_C763_4ED2_41C9_24B475FBBEEE",
 "enabledInCardboard": true
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C, this.camera_FAB08ECF_C71C_C6EE_41C8_8F338E08E64D); this.mainPlayList.set('selectedIndex', 15)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 01a"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_FA053E90_C71C_C971_41BB_0A85B3730A57",
   "yaw": 154.8,
   "pitch": -44.28,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 13.92
  }
 ],
 "useHandCursor": true,
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
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -44.28
  }
 ],
 "id": "overlay_DDFC90E3_C76D_7AD6_41E6_FFEEF526FE90",
 "enabledInCardboard": true
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CD479071_C71C_D9B2_41D0_92945B278722, this.camera_F0D64376_C71F_3FBE_41E5_5BB84C1D9C07); this.mainPlayList.set('selectedIndex', 34)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "items": [
  {
   "yaw": -0.72,
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
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 10.87
  }
 ],
 "useHandCursor": true,
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
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 1.16
  }
 ],
 "id": "overlay_EAECF1EB_C72D_FAD6_41A8_B49AEB304111",
 "enabledInCardboard": true
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060, this.camera_F0C82386_C71F_3F5E_41DA_BDBCBAFF2A9A); this.mainPlayList.set('selectedIndex', 38)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 01a"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_FAFA0EA9_C71C_C952_41E7_A924F7649F29",
   "yaw": 148.02,
   "pitch": -50.56,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 12.35
  }
 ],
 "useHandCursor": true,
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
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -50.56
  }
 ],
 "id": "overlay_E91CF77E_C72C_C7AE_41E6_ED92117BB9B5",
 "enabledInCardboard": true
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CD888F1A_C71C_C776_41E5_354715787DA9, this.camera_FF7E03A6_C71F_3F5E_41E4_4B0801E12337); this.mainPlayList.set('selectedIndex', 7)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 01a"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_D1F813E7_C77D_5EDE_41C5_D3614EBDB84C",
   "yaw": -87.63,
   "pitch": -39.01,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 15.1
  }
 ],
 "useHandCursor": true,
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
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -39.01
  }
 ],
 "id": "overlay_D201568E_C765_3951_41E8_132B3132B361",
 "enabledInCardboard": true
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB, this.camera_F29D9269_C71F_39D2_41E1_4CF230416109); this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "items": [
  {
   "yaw": 154.03,
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
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 15.89
  }
 ],
 "useHandCursor": true,
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
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 1.41
  }
 ],
 "id": "overlay_D29433BE_C765_3EAE_41D8_CC80272D951C",
 "enabledInCardboard": true
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335, this.camera_F2934269_C71F_39D2_41E5_426126B262F3); this.mainPlayList.set('selectedIndex', 10)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 01a"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_D1F893E7_C77D_5EDE_41C5_65F129D18629",
   "yaw": -21.56,
   "pitch": -28.7,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 17.05
  }
 ],
 "useHandCursor": true,
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
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -28.7
  }
 ],
 "id": "overlay_D179CE94_C763_4971_41E1_4D5D0BD3A926",
 "enabledInCardboard": true
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86, this.camera_F2BD8254_C71F_39F2_41D3_83331D0C3292); this.mainPlayList.set('selectedIndex', 12)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "items": [
  {
   "yaw": 153.66,
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
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 17.65
  }
 ],
 "useHandCursor": true,
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
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 15
     }
    ]
   },
   "pitch": 1.41
  }
 ],
 "id": "overlay_D95E3B79_C764_CFB2_41CF_C88AFF6D4BC6",
 "enabledInCardboard": true
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6, this.camera_F2B0D25A_C71F_39F1_41E6_C60FD30C1D2C); this.mainPlayList.set('selectedIndex', 21)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 01a"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_FA063E9F_C71C_C96E_4167_3D539ED4B53A",
   "yaw": -19.17,
   "pitch": -32.09,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 11.15
  }
 ],
 "useHandCursor": true,
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
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -32.09
  }
 ],
 "id": "overlay_D84AC366_C763_5FD1_41D2_AE1B94515E56",
 "enabledInCardboard": true
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 11)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 01a"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_FA0AFE90_C71C_C971_41E3_CBCF4A5E2A9D",
   "yaw": -121.15,
   "pitch": -30.44,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 11.37
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -121.15,
   "hfov": 11.37,
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
 ],
 "id": "overlay_DF87A050_C767_D9F2_41B5_A747371BE693",
 "enabledInCardboard": true
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC, this.camera_F13CF2A8_C71F_3952_41C2_D36AB4E4EF92); this.mainPlayList.set('selectedIndex', 20)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01 Left"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_FA0A9E90_C71C_C971_41C3_7E6CB6CE785E",
   "yaw": 77.5,
   "pitch": -1.44,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 7.53
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 77.5,
   "hfov": 7.53,
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
 ],
 "id": "overlay_DE0068F1_C767_4AB2_41E8_311A365DEAB0",
 "enabledInCardboard": true
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CD93C521_C71D_3B53_41E8_25606B0344D0, this.camera_F149A2A8_C71F_3952_41C7_50E2C8939C06); this.mainPlayList.set('selectedIndex', 18)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01 Right"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_FA0A3E90_C71C_C971_41E2_0B5284AAC565",
   "yaw": 93.83,
   "pitch": -0.94,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 7.54
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 93.83,
   "hfov": 7.54,
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
 ],
 "id": "overlay_DDD9E5FF_C765_5AAE_41E5_46C9CCEA06DE",
 "enabledInCardboard": true
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045, this.camera_F197731D_C71F_3F72_41E1_0571D76DF8D2); this.mainPlayList.set('selectedIndex', 5)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "items": [
  {
   "yaw": 30.15,
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
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 11.82
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 30.15,
   "hfov": 11.82,
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
 ],
 "id": "overlay_C9502109_C72D_3B52_41E6_EA33AED203C6",
 "enabledInCardboard": true
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2, this.camera_F186931F_C71F_3F6E_41D7_C0913B18FD37); this.mainPlayList.set('selectedIndex', 3)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "items": [
  {
   "yaw": 127.75,
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
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 9.06
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 127.75,
   "hfov": 9.06,
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
 ],
 "id": "overlay_C8B50F54_C72F_47F2_41BD_3D4C2E212738",
 "enabledInCardboard": true
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C, this.camera_F1B29307_C71F_3F5E_41B0_50C890B83348); this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01 Left"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_D1FC53DD_C77D_5EF2_41E5_1CC973DDBEA3",
   "yaw": -20.98,
   "pitch": -1.19,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 7.54
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -20.98,
   "hfov": 7.54,
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
 ],
 "id": "overlay_D54F99DC_C72F_CAF2_41E3_249E41049022",
 "enabledInCardboard": true
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB, this.camera_F1A5E307_C71F_3F5E_41D4_646B18A9A632); this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 01a"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_D1FCA3DD_C77D_5EF2_41DD_9635E996FADF",
   "yaw": -169.89,
   "pitch": -23.91,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 13.89
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -169.89,
   "hfov": 13.89,
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
 ],
 "id": "overlay_D7048D5C_C72C_CBF1_41E2_9CEB980C06AF",
 "enabledInCardboard": true
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42, this.camera_F08C63A6_C71F_3F5E_41CC_29213194E74D); this.mainPlayList.set('selectedIndex', 37)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 01a"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_FAF59EA9_C71C_C952_41E5_B775D7D6589B",
   "yaw": -131.59,
   "pitch": -41.01,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 14.67
  }
 ],
 "useHandCursor": true,
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
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -41.01
  }
 ],
 "id": "overlay_E9099FDF_C72F_C6EE_41E3_A646B2C2340D",
 "enabledInCardboard": true
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CC131311_C71D_3F72_41C7_6DBD9418A942, this.camera_F22FD201_C71F_3953_41E5_65CF24E49C2D); this.mainPlayList.set('selectedIndex', 9)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 01a"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_D1F8D3E7_C77D_5EDE_41E7_872B52F6C2BA",
   "yaw": 68.51,
   "pitch": -33.47,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 10.14
  }
 ],
 "useHandCursor": true,
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
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -33.47
  }
 ],
 "id": "overlay_D10180AB_C763_D956_41E1_17A33D3BEE1E",
 "enabledInCardboard": true
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CC48A826_C71D_4951_41E7_7F28A52014B9, this.camera_F238E1F9_C71F_3AB3_4192_AE1A353DBB1D); this.mainPlayList.set('selectedIndex', 0)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "items": [
  {
   "yaw": -142.41,
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
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 16.35
  }
 ],
 "useHandCursor": true,
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
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 15
     }
    ]
   },
   "pitch": 4.3
  }
 ],
 "id": "overlay_D464C36F_C76D_5FAF_41D8_35D099FAD98B",
 "enabledInCardboard": true
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CC175683_C71F_5956_41AA_704EB81E1F05, this.camera_F24201EB_C71F_3AD6_41E7_21D725FA740E); this.mainPlayList.set('selectedIndex', 6)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 01a"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_D1FEF3E7_C77D_5EDE_41D4_38C2D06ADC42",
   "yaw": -23.19,
   "pitch": -25.81,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 15.01
  }
 ],
 "useHandCursor": true,
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
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -25.81
  }
 ],
 "id": "overlay_D4E3A43C_C76F_59B1_41D0_FA262DAB39CB",
 "enabledInCardboard": true
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CD479071_C71C_D9B2_41D0_92945B278722, this.camera_F9745EEF_C71C_C6AE_41E7_4CAB6130AF1D); this.mainPlayList.set('selectedIndex', 34)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 01a"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_FAF87EA1_C71C_C952_41C8_3FCBCBECD984",
   "yaw": -121.4,
   "pitch": -27.3,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 14.4
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -121.4,
   "hfov": 14.4,
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
 ],
 "id": "overlay_EC843EC7_C724_C6DF_41E4_78AEC11AB30A",
 "enabledInCardboard": true
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_EBE3DC98_C723_4972_41E0_39A7A1000045, this.camera_F965FEFF_C71C_C6AE_41E3_E59E42B96C74); this.mainPlayList.set('selectedIndex', 43)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01 Left"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_FAFBFEA1_C71C_C952_41B8_FA87855F3C69",
   "yaw": 77.5,
   "pitch": -0.44,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 7.54
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 77.5,
   "hfov": 7.54,
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
 ],
 "id": "overlay_EBD3DBCF_C723_4EEE_41D3_4E82F6F873AE",
 "enabledInCardboard": true
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506, this.camera_F95A1F0F_C71C_C76E_41E1_C7713EE7EFF7); this.mainPlayList.set('selectedIndex', 41)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01 Right"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_FAFB6EA9_C71C_C952_41E8_1C6CEBCA1BD1",
   "yaw": 94.33,
   "pitch": -0.69,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 7.54
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 94.33,
   "hfov": 7.54,
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
 ],
 "id": "overlay_E9586F13_C72C_C776_41D2_741B38E3831E",
 "enabledInCardboard": true
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD, this.camera_F020C356_C71F_3FFE_41C7_2229F3CB1CED); this.mainPlayList.set('selectedIndex', 35)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "items": [
  {
   "yaw": 21.64,
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
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 10.87
  }
 ],
 "useHandCursor": true,
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
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -0.12
  }
 ],
 "id": "overlay_F7CC04EB_C723_5AD6_41D4_F9DE6E7EE7BF",
 "enabledInCardboard": true
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B, this.camera_F0317347_C71F_3FDE_41CD_874271AC16A7); this.mainPlayList.set('selectedIndex', 42)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 01a"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_FAF74EA9_C71C_C952_41E8_38FEB7F700B9",
   "yaw": -148.93,
   "pitch": -48.06,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 12.99
  }
 ],
 "useHandCursor": true,
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
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -48.06
  }
 ],
 "id": "overlay_F6F55B77_C723_4FBE_41D4_D6F2BBFF046B",
 "enabledInCardboard": true
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506, this.camera_FAA6AEE0_C71C_C6D1_41E5_619A7BC49E51); this.mainPlayList.set('selectedIndex', 41)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 01a"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_FAF44EA9_C71C_C952_4199_BDB7CA12AD5B",
   "yaw": -77.83,
   "pitch": -38.26,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 15.26
  }
 ],
 "useHandCursor": true,
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
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -38.26
  }
 ],
 "id": "overlay_F5309816_C725_4971_41DC_62B6061471DF",
 "enabledInCardboard": true
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CD479071_C71C_D9B2_41D0_92945B278722, this.camera_FA96BEE0_C71C_C6D1_41C5_4E9A0CF632EE); this.mainPlayList.set('selectedIndex', 34)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "items": [
  {
   "yaw": -143.41,
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
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 17.4
  }
 ],
 "useHandCursor": true,
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
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 15
     }
    ]
   },
   "pitch": 0.78
  }
 ],
 "id": "overlay_E994C697_C72F_797F_41D3_1180D963962C",
 "enabledInCardboard": true
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CD973440_C71F_79D2_41CE_832903CFC20A, this.camera_FA842EEF_C71C_C6AE_41DE_89FA80D47C34); this.mainPlayList.set('selectedIndex', 40)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 01a"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_FAF4CEA9_C71C_C952_41C3_67D4ED586AF0",
   "yaw": -22.69,
   "pitch": -25.81,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 15.01
  }
 ],
 "useHandCursor": true,
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
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -25.81
  }
 ],
 "id": "overlay_E8B86196_C72D_7B7E_41D9_E9ACE1C1D537",
 "enabledInCardboard": true
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_EBE3DC98_C723_4972_41E0_39A7A1000045, this.camera_F9199F2F_C71C_C7AE_41A7_2A94E0F8FC1F); this.mainPlayList.set('selectedIndex', 43)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 01a"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_FAF6FEA9_C71C_C952_41D0_F10082DE0B78",
   "yaw": 70.89,
   "pitch": -33.22,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 9.96
  }
 ],
 "useHandCursor": true,
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
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -33.22
  }
 ],
 "id": "overlay_F4767B1F_C727_4F6F_41DB_8ED192ED33D1",
 "enabledInCardboard": true
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2, this.camera_F2DD823A_C71F_39B6_41E5_AC9C806F991B); this.mainPlayList.set('selectedIndex', 3)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 01a"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_D1FE93E7_C77D_5EDE_41BF_076B82AF6AC9",
   "yaw": -138.88,
   "pitch": -38.25,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 15.27
  }
 ],
 "useHandCursor": true,
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
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -38.25
  }
 ],
 "id": "overlay_D5B45B26_C76D_CF5E_41D0_7E370B2F5BD4",
 "enabledInCardboard": true
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CD732023_C71F_F956_41D6_6910628043DA, this.camera_F166D293_C71F_3976_41E0_38D4673931AE); this.mainPlayList.set('selectedIndex', 14)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 01a"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_FA04DE90_C71C_C971_41DC_494A4C2AF1A6",
   "yaw": -133.6,
   "pitch": -38.75,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 15.16
  }
 ],
 "useHandCursor": true,
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
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -38.75
  }
 ],
 "id": "overlay_DDB914AF_C76D_7AAE_41DD_FD246BE7004B",
 "enabledInCardboard": true
},
{
 "frameDuration": 62,
 "frameCount": 9,
 "id": "AnimatedImageResource_D1FFD3DD_C77D_5EF2_41CE_89845FEA3E36",
 "colCount": 3,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0_HS_0_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 270
  }
 ],
 "rowCount": 3
},
{
 "frameDuration": 41,
 "frameCount": 20,
 "id": "AnimatedImageResource_FAFD8EA1_C71C_C952_41D8_373C2A3BC59E",
 "colCount": 4,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5
},
{
 "frameDuration": 62,
 "frameCount": 9,
 "id": "AnimatedImageResource_FA00CE9F_C71C_C96E_41CB_FD5F6C56B63D",
 "colCount": 3,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932_0_HS_2_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "rowCount": 3
},
{
 "frameDuration": 41,
 "frameCount": 20,
 "id": "AnimatedImageResource_FA006EA1_C71C_C952_41E3_EEF6B4FA49B4",
 "colCount": 4,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932_0_HS_3_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5
},
{
 "frameDuration": 62,
 "frameCount": 9,
 "id": "AnimatedImageResource_FAF94EA1_C71C_C952_41E4_0731DD7884F3",
 "colCount": 3,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_CD479071_C71C_D9B2_41D0_92945B278722_0_HS_2_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "rowCount": 3
},
{
 "frameDuration": 41,
 "frameCount": 20,
 "id": "AnimatedImageResource_FAF8DEA1_C71C_C952_41D9_3F5AF1CE979B",
 "colCount": 4,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_CD479071_C71C_D9B2_41D0_92945B278722_0_HS_3_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5
},
{
 "frameDuration": 41,
 "frameCount": 20,
 "id": "AnimatedImageResource_FAFFEEA1_C71C_C952_41E8_6B492A5DBA36",
 "colCount": 4,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5
},
{
 "frameDuration": 62,
 "frameCount": 9,
 "id": "AnimatedImageResource_FAFAFEA9_C71C_C952_41CA_4FFF116D99CA",
 "colCount": 3,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_1_HS_0_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 270
  }
 ],
 "rowCount": 3
},
{
 "frameDuration": 41,
 "frameCount": 20,
 "id": "AnimatedImageResource_FA07DE90_C71C_C971_41A0_4218535C0002",
 "colCount": 4,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5
},
{
 "frameDuration": 62,
 "frameCount": 9,
 "id": "AnimatedImageResource_FA0BAE90_C71C_C971_41E0_63F6F161FC76",
 "colCount": 3,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB_0_HS_2_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "rowCount": 3
},
{
 "frameDuration": 41,
 "frameCount": 20,
 "id": "AnimatedImageResource_FA0B4E90_C71C_C971_41D3_88FDD6887B44",
 "colCount": 4,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB_0_HS_3_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5
},
{
 "frameDuration": 41,
 "frameCount": 20,
 "id": "AnimatedImageResource_FAFEFEA1_C71C_C952_41C0_6B0A32F7BF3D",
 "colCount": 4,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5
},
{
 "frameDuration": 62,
 "frameCount": 9,
 "id": "AnimatedImageResource_FA00DEA1_C71C_C952_41E2_F23785FC8BDC",
 "colCount": 3,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_CD47441A_C71C_F976_41E5_56E16AD8E357_0_HS_0_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "rowCount": 3
},
{
 "frameDuration": 62,
 "frameCount": 9,
 "id": "AnimatedImageResource_FA004EA1_C71C_C952_41C3_8632FF40FA9D",
 "colCount": 3,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_CD47441A_C71C_F976_41E5_56E16AD8E357_0_HS_1_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "rowCount": 3
},
{
 "frameDuration": 41,
 "frameCount": 20,
 "id": "AnimatedImageResource_FA03EEA1_C71C_C952_41BF_5073535470B3",
 "colCount": 4,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_CD47441A_C71C_F976_41E5_56E16AD8E357_0_HS_2_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5
},
{
 "frameDuration": 41,
 "frameCount": 20,
 "id": "AnimatedImageResource_FA044E90_C71C_C971_41E5_5531B3116D9D",
 "colCount": 4,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5
},
{
 "frameDuration": 41,
 "frameCount": 20,
 "id": "AnimatedImageResource_FA01CE9F_C71C_C96E_41C5_FF2C26F6F9F4",
 "colCount": 4,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5
},
{
 "frameDuration": 41,
 "frameCount": 20,
 "id": "AnimatedImageResource_FAFC5EA1_C71C_C952_41E0_BCC489328B91",
 "colCount": 4,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5
},
{
 "frameDuration": 41,
 "frameCount": 20,
 "id": "AnimatedImageResource_FA06DE9F_C71C_C96E_41E1_A30D63F2FB79",
 "colCount": 4,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5
},
{
 "frameDuration": 41,
 "frameCount": 20,
 "id": "AnimatedImageResource_FAF44EA9_C71C_C952_41CD_FB91195244B1",
 "colCount": 4,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5
},
{
 "frameDuration": 41,
 "frameCount": 20,
 "id": "AnimatedImageResource_FA02CEA1_C71C_C952_41D9_C7699FA42E28",
 "colCount": 4,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5
},
{
 "frameDuration": 41,
 "frameCount": 20,
 "id": "AnimatedImageResource_FAF78EA9_C71C_C952_41A5_6A3A0AEBEC10",
 "colCount": 4,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5
},
{
 "frameDuration": 41,
 "frameCount": 20,
 "id": "AnimatedImageResource_D1FE33E7_C77D_5EDE_41D2_061D00B2B4AE",
 "colCount": 4,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5
},
{
 "frameDuration": 62,
 "frameCount": 9,
 "id": "AnimatedImageResource_FA05CE90_C71C_C971_41DA_6F68C88587BE",
 "colCount": 3,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0_HS_0_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 270
  }
 ],
 "rowCount": 3
},
{
 "frameDuration": 41,
 "frameCount": 20,
 "id": "AnimatedImageResource_FAFD0EA1_C71C_C952_41D1_EB8B49E98B69",
 "colCount": 4,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5
},
{
 "frameDuration": 41,
 "frameCount": 20,
 "id": "AnimatedImageResource_D1F953E7_C77D_5EDE_41B3_BBC8AE666EFB",
 "colCount": 4,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5
},
{
 "frameDuration": 62,
 "frameCount": 9,
 "id": "AnimatedImageResource_FA037EA1_C71C_C952_41C7_D133F5C1BD46",
 "colCount": 3,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0_HS_0_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 270
  }
 ],
 "rowCount": 3
},
{
 "frameDuration": 41,
 "frameCount": 20,
 "id": "AnimatedImageResource_FA073E9F_C71C_C96E_4198_7EA928FE7C01",
 "colCount": 4,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5
},
{
 "frameDuration": 62,
 "frameCount": 9,
 "id": "AnimatedImageResource_D1FF13DD_C77D_5EF2_41CF_2558FD0159CA",
 "colCount": 3,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB_0_HS_0_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "rowCount": 3
},
{
 "frameDuration": 62,
 "frameCount": 9,
 "id": "AnimatedImageResource_D1FF53DD_C77D_5EF2_41DF_0CE4BBD4FAA4",
 "colCount": 3,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB_0_HS_1_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "rowCount": 3
},
{
 "frameDuration": 41,
 "frameCount": 20,
 "id": "AnimatedImageResource_D1FF93DD_C77D_5EF2_41CB_8856CCC91593",
 "colCount": 4,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB_0_HS_2_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5
},
{
 "frameDuration": 41,
 "frameCount": 20,
 "id": "AnimatedImageResource_FAFE9EA1_C71C_C952_41DA_D7061FCCB4FA",
 "colCount": 4,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5
},
{
 "frameDuration": 41,
 "frameCount": 20,
 "id": "AnimatedImageResource_D1F9D3E7_C77D_5EDE_41D3_15BE236E2A6A",
 "colCount": 4,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_CD888F1A_C71C_C776_41E5_354715787DA9_0_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5
},
{
 "frameDuration": 41,
 "frameCount": 20,
 "id": "AnimatedImageResource_FA024EA1_C71C_C952_41E6_04D5EC23BC22",
 "colCount": 4,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5
},
{
 "frameDuration": 41,
 "frameCount": 20,
 "id": "AnimatedImageResource_FA053E90_C71C_C971_41BB_0A85B3730A57",
 "colCount": 4,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5
},
{
 "frameDuration": 41,
 "frameCount": 20,
 "id": "AnimatedImageResource_FAFA0EA9_C71C_C952_41E7_A924F7649F29",
 "colCount": 4,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5
},
{
 "frameDuration": 41,
 "frameCount": 20,
 "id": "AnimatedImageResource_D1F813E7_C77D_5EDE_41C5_D3614EBDB84C",
 "colCount": 4,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5
},
{
 "frameDuration": 41,
 "frameCount": 20,
 "id": "AnimatedImageResource_D1F893E7_C77D_5EDE_41C5_65F129D18629",
 "colCount": 4,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5
},
{
 "frameDuration": 41,
 "frameCount": 20,
 "id": "AnimatedImageResource_FA063E9F_C71C_C96E_4167_3D539ED4B53A",
 "colCount": 4,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5
},
{
 "frameDuration": 41,
 "frameCount": 20,
 "id": "AnimatedImageResource_FA0AFE90_C71C_C971_41E3_CBCF4A5E2A9D",
 "colCount": 4,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86_0_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5
},
{
 "frameDuration": 62,
 "frameCount": 9,
 "id": "AnimatedImageResource_FA0A9E90_C71C_C971_41C3_7E6CB6CE785E",
 "colCount": 3,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86_0_HS_1_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "rowCount": 3
},
{
 "frameDuration": 62,
 "frameCount": 9,
 "id": "AnimatedImageResource_FA0A3E90_C71C_C971_41E2_0B5284AAC565",
 "colCount": 3,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86_0_HS_2_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "rowCount": 3
},
{
 "frameDuration": 62,
 "frameCount": 9,
 "id": "AnimatedImageResource_D1FC53DD_C77D_5EF2_41E5_1CC973DDBEA3",
 "colCount": 3,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_CC48A826_C71D_4951_41E7_7F28A52014B9_0_HS_2_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "rowCount": 3
},
{
 "frameDuration": 41,
 "frameCount": 20,
 "id": "AnimatedImageResource_D1FCA3DD_C77D_5EF2_41DD_9635E996FADF",
 "colCount": 4,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_CC48A826_C71D_4951_41E7_7F28A52014B9_0_HS_3_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5
},
{
 "frameDuration": 41,
 "frameCount": 20,
 "id": "AnimatedImageResource_FAF59EA9_C71C_C952_41E5_B775D7D6589B",
 "colCount": 4,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5
},
{
 "frameDuration": 41,
 "frameCount": 20,
 "id": "AnimatedImageResource_D1F8D3E7_C77D_5EDE_41E7_872B52F6C2BA",
 "colCount": 4,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5
},
{
 "frameDuration": 41,
 "frameCount": 20,
 "id": "AnimatedImageResource_D1FEF3E7_C77D_5EDE_41D4_38C2D06ADC42",
 "colCount": 4,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5
},
{
 "frameDuration": 41,
 "frameCount": 20,
 "id": "AnimatedImageResource_FAF87EA1_C71C_C952_41C8_3FCBCBECD984",
 "colCount": 4,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD_0_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5
},
{
 "frameDuration": 62,
 "frameCount": 9,
 "id": "AnimatedImageResource_FAFBFEA1_C71C_C952_41B8_FA87855F3C69",
 "colCount": 3,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD_0_HS_1_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "rowCount": 3
},
{
 "frameDuration": 62,
 "frameCount": 9,
 "id": "AnimatedImageResource_FAFB6EA9_C71C_C952_41E8_1C6CEBCA1BD1",
 "colCount": 3,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD_0_HS_2_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "rowCount": 3
},
{
 "frameDuration": 41,
 "frameCount": 20,
 "id": "AnimatedImageResource_FAF74EA9_C71C_C952_41E8_38FEB7F700B9",
 "colCount": 4,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5
},
{
 "frameDuration": 41,
 "frameCount": 20,
 "id": "AnimatedImageResource_FAF44EA9_C71C_C952_4199_BDB7CA12AD5B",
 "colCount": 4,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5
},
{
 "frameDuration": 41,
 "frameCount": 20,
 "id": "AnimatedImageResource_FAF4CEA9_C71C_C952_41C3_67D4ED586AF0",
 "colCount": 4,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5
},
{
 "frameDuration": 41,
 "frameCount": 20,
 "id": "AnimatedImageResource_FAF6FEA9_C71C_C952_41D0_F10082DE0B78",
 "colCount": 4,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5
},
{
 "frameDuration": 41,
 "frameCount": 20,
 "id": "AnimatedImageResource_D1FE93E7_C77D_5EDE_41BF_076B82AF6AC9",
 "colCount": 4,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5
},
{
 "frameDuration": 41,
 "frameCount": 20,
 "id": "AnimatedImageResource_FA04DE90_C71C_C971_41DC_494A4C2AF1A6",
 "colCount": 4,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5
}],
 "gap": 10,
 "scrollBarOpacity": 0.5,
 "height": "100%",
 "scrollBarMargin": 2,
 "shadow": false,
 "contentOpaque": false,
 "borderRadius": 0,
 "mouseWheelEnabled": true,
 "paddingTop": 0,
 "data": {
  "name": "Player486"
 },
 "defaultVRPointer": "laser",
 "vrPolyfillScale": 0.5,
 "scripts": {
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "existsKey": function(key){  return key in window; },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "unregisterKey": function(key){  delete window[key]; },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "getKey": function(key){  return window[key]; },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "registerKey": function(key, value){  window[key] = value; },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); }
 },
 "propagateClick": false,
 "downloadEnabled": false
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
