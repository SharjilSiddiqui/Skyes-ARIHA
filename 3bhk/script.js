(function(){
    var script = {
 "start": "this.init()",
 "children": [
  "this.MainViewer"
 ],
 "id": "rootPlayer",
 "width": "100%",
 "paddingBottom": 0,
 "scrollBarWidth": 10,
 "borderRadius": 0,
 "paddingRight": 0,
 "verticalAlign": "top",
 "paddingLeft": 0,
 "borderSize": 0,
 "propagateClick": false,
 "minHeight": 20,
 "backgroundPreloadEnabled": true,
 "definitions": [{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -142.45,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_12800BD5_0618_A212_418C_7BD3DBF49293"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 21.84,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_11440D30_0618_A612_4190_920F944CB4DE"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -44.08,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_13C779A0_0618_AE32_4180_0B80877F92C8"
},
{
 "hfov": 360,
 "hfovMin": "150%",
 "class": "Panorama",
 "label": "3bhk bedroom03 01 28th",
 "id": "panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B",
 "overlays": [
  "this.overlay_DC0C8682_C673_D8C1_41C9_3F738D8FB7A5",
  "this.overlay_DC8E5D89_C64C_48C3_41D0_5E147F703183"
 ],
 "pitch": 0,
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_0/b/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_0/b/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_0/b/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_0/f/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_0/f/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_0/f/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_0/l/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_0/l/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_0/u/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_0/u/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_0/r/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_0/r/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_0/d/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_0/d/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_0/d/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "backwardYaw": -49.75,
   "panorama": "this.panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6",
   "yaw": 34.74,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "backwardYaw": 35.45,
   "panorama": "this.panorama_C8E8EEF1_C391_88BE_41E1_593F441770DA",
   "yaw": 151.46,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "thumbnailUrl": "media/panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_t.jpg"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -43.52,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_11399B39_0618_A213_417D_61D4C1EB6EAC"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -135.16,
  "pitch": -6.53
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 26.51
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 26.51
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 26.51
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2_camera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 61.76,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_10005CC9_0618_A672_4196_4B5B798E69F9"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 59.87,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_10701CC2_0618_A676_4196_4E0985C924C7"
},
{
 "hfov": 360,
 "hfovMin": "150%",
 "class": "Panorama",
 "label": "3bhk bedroom01 33rd",
 "id": "panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D",
 "overlays": [
  "this.overlay_E7E37E24_C654_4BC2_41E1_8DC9EEC30B49"
 ],
 "pitch": 0,
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D_0/b/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D_0/b/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D_0/b/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D_0/f/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D_0/f/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D_0/f/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D_0/l/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D_0/l/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D_0/u/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D_0/u/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D_0/r/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D_0/r/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D_0/d/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D_0/d/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D_0/d/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "backwardYaw": 37.55,
   "panorama": "this.panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068",
   "yaw": -68.97,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "thumbnailUrl": "media/panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D_t.jpg"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 21.63,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_1329F988_0618_AEF2_4172_A79498E78C8F"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 179.76,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_106D19FE_0618_AE11_418D_6731319490E8"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -119.57,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_13443C0D_0618_A5F2_4195_9C9AD6B260B9"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 56.21,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_105DB9E8_0618_AE32_418C_2BABC28F2C52"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_C8E8EEF1_C391_88BE_41E1_593F441770DA_camera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -35.14,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_13A71C9A_0618_A616_4192_89C5B295ADB8"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -174.18,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_1365FC26_0618_A631_4191_B53DE62D784F"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_camera"
},
{
 "hfov": 360,
 "hfovMin": "150%",
 "class": "Panorama",
 "label": "3bhk bedroom02 1 28th",
 "id": "panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5",
 "overlays": [
  "this.overlay_DFA742CC_C674_3841_419D_AB7849550207",
  "this.overlay_14AA83F7_0608_A21E_4189_B52BDB95135B"
 ],
 "pitch": 0,
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5_0/b/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5_0/b/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5_0/b/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5_0/f/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5_0/f/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5_0/f/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5_0/l/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5_0/l/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5_0/u/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5_0/u/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5_0/r/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5_0/r/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5_0/d/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5_0/d/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5_0/d/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "backwardYaw": -21.75,
   "panorama": "this.panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0",
   "yaw": 88.07,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "backwardYaw": -131.63,
   "panorama": "this.panorama_11906CBC_0049_DF4E_411B_4127E5D5F480",
   "yaw": 117.1,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "thumbnailUrl": "media/panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5_t.jpg"
},
{
 "hfov": 360,
 "hfovMin": "135%",
 "class": "Panorama",
 "label": "3bhk_BDRoom03_toilet copy",
 "id": "panorama_136FCF41_004A_D936_4151_FFADF2CFBA26",
 "overlays": [
  "this.overlay_163A1A6F_005F_DBCA_4143_609D9385BACF"
 ],
 "pitch": 0,
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_136FCF41_004A_D936_4151_FFADF2CFBA26_0/b/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_136FCF41_004A_D936_4151_FFADF2CFBA26_0/b/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_136FCF41_004A_D936_4151_FFADF2CFBA26_0/b/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_136FCF41_004A_D936_4151_FFADF2CFBA26_0/f/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_136FCF41_004A_D936_4151_FFADF2CFBA26_0/f/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_136FCF41_004A_D936_4151_FFADF2CFBA26_0/f/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_136FCF41_004A_D936_4151_FFADF2CFBA26_0/l/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_136FCF41_004A_D936_4151_FFADF2CFBA26_0/l/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_136FCF41_004A_D936_4151_FFADF2CFBA26_0/u/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_136FCF41_004A_D936_4151_FFADF2CFBA26_0/u/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_136FCF41_004A_D936_4151_FFADF2CFBA26_0/r/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_136FCF41_004A_D936_4151_FFADF2CFBA26_0/r/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_136FCF41_004A_D936_4151_FFADF2CFBA26_0/d/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_136FCF41_004A_D936_4151_FFADF2CFBA26_0/d/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_136FCF41_004A_D936_4151_FFADF2CFBA26_0/d/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_136FCF41_004A_D936_4151_FFADF2CFBA26_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "backwardYaw": -94.17,
   "panorama": "this.panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D",
   "yaw": 61.56,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "thumbnailUrl": "media/panorama_136FCF41_004A_D936_4151_FFADF2CFBA26_t.jpg"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 61.38,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 26.51
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 26.51
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 26.51
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_10985D10_0618_A612_4197_726189AFA414"
},
{
 "hfov": 360,
 "hfovMin": "150%",
 "class": "Panorama",
 "label": "3bhk bedroom02 17th",
 "id": "panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5",
 "overlays": [
  "this.overlay_D0FEC682_C3F1_BB62_41D4_9102F3B6D6C5",
  "this.overlay_D09F0370_C3F0_99BE_41E4_9F144A073A5D",
  "this.overlay_110BAFB3_0059_F95A_4127_54DF609932E8"
 ],
 "pitch": 0,
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_0/b/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_0/b/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_0/b/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_0/f/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_0/f/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_0/f/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_0/l/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_0/l/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_0/u/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_0/u/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_0/r/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_0/r/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_0/d/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_0/d/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_0/d/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "backwardYaw": -64.1,
   "panorama": "this.panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23",
   "yaw": 35.42,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "backwardYaw": -3.63,
   "panorama": "this.panorama_0B55BDE4_0039_38FE_4139_E851DEBF7C58",
   "yaw": -120.13,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "backwardYaw": -125.71,
   "panorama": "this.panorama_C8443AAC_C390_88A6_41E1_B9756BC8A56B",
   "yaw": -158.37,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "thumbnailUrl": "media/panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_t.jpg"
},
{
 "hfov": 360,
 "hfovMin": "150%",
 "class": "Panorama",
 "label": "3bhk bedroom02 33rd",
 "id": "panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068",
 "overlays": [
  "this.overlay_E6C34BC9_C65D_C843_41E3_37D707F31C56",
  "this.overlay_E7577260_C65C_7843_41E0_F5DDAEA8A5BD",
  "this.overlay_19DDB770_0049_29D6_4144_6CAA6C7E4DF0"
 ],
 "pitch": 0,
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_0/b/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_0/b/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_0/b/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_0/f/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_0/f/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_0/f/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_0/l/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_0/l/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_0/u/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_0/u/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_0/r/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_0/r/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_0/d/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_0/d/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_0/d/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "backwardYaw": -124.51,
   "panorama": "this.panorama_C8E07E20_C390_8B5D_41D7_DBEAC9716594",
   "yaw": -157.54,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "backwardYaw": -68.97,
   "panorama": "this.panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D",
   "yaw": 37.55,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "backwardYaw": -3.63,
   "panorama": "this.panorama_118D55D0_004A_E8D6_412B_F15016B43EC0",
   "yaw": -118.24,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "thumbnailUrl": "media/panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_t.jpg"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 85.83,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_13E419AF_0618_AE0E_4148_BBE4449EEC26"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -104.01,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 26.51
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 26.51
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 26.51
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_100B1A22_0618_A236_4198_E775406AFF23"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -76.34,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_10E4DAA5_0618_A232_4194_49E1F31C3840"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -173.63,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_112B0B2F_0618_A20E_418E_5A7E1D3677DE"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -174.02,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_13C34C65_0618_A632_4196_33761D0F249A"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -144.45,
  "pitch": -9.04
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5_camera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_ED4C0B8B_E6E7_5822_41E3_51E3E08986AA_camera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 98.79,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_139279C9_0618_AE73_4192_AB67E93D2D86"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 167.56,
  "pitch": -4.27
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_0B55BDE4_0039_38FE_4139_E851DEBF7C58_camera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_11906CBC_0049_DF4E_411B_4127E5D5F480_camera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 114.32,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_117D4B16_0618_A21E_4198_36AA6C824EDD"
},
{
 "hfov": 360,
 "hfovMin": "150%",
 "class": "Panorama",
 "label": "3bhk bedroom02 28th",
 "id": "panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A",
 "overlays": [
  "this.overlay_DE78BD94_C67C_48C1_41E0_19E3E3F56405",
  "this.overlay_DEFD2A97_C674_C8CF_41E4_A52F962F63C7",
  "this.overlay_168A7BD6_0059_58DD_414D_A29E2A615EAE"
 ],
 "pitch": 0,
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_0/b/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_0/b/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_0/b/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_0/f/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_0/f/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_0/f/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_0/l/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_0/l/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_0/u/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_0/u/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_0/r/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_0/r/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_0/d/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_0/d/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_0/d/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "backwardYaw": -125.71,
   "panorama": "this.panorama_C8E097E2_C390_F8A2_419E_45918FB20A48",
   "yaw": -158.16,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "backwardYaw": -65.68,
   "panorama": "this.panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5",
   "yaw": 39.47,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_118B7384_0049_E93E_4136_7E71C475A6E0"
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "thumbnailUrl": "media/panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_t.jpg"
},
{
 "hfov": 360,
 "hfovMin": "135%",
 "class": "Panorama",
 "label": "3bhk 01 hall 33 rd floor",
 "id": "panorama_C8E07E20_C390_8B5D_41D7_DBEAC9716594",
 "overlays": [
  "this.overlay_DAD97D83_C654_48C7_41B7_5C3CD58749B6",
  "this.overlay_DB45F6D9_C654_3843_41E0_655C9315E778",
  "this.overlay_DBC73BCC_C654_4841_41C6_2F8A5000FCD7",
  "this.overlay_F7D8DDC3_E6E6_D823_41EB_93AB600F6632"
 ],
 "pitch": 0,
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E07E20_C390_8B5D_41D7_DBEAC9716594_0/b/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E07E20_C390_8B5D_41D7_DBEAC9716594_0/b/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E07E20_C390_8B5D_41D7_DBEAC9716594_0/b/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E07E20_C390_8B5D_41D7_DBEAC9716594_0/f/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E07E20_C390_8B5D_41D7_DBEAC9716594_0/f/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E07E20_C390_8B5D_41D7_DBEAC9716594_0/f/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E07E20_C390_8B5D_41D7_DBEAC9716594_0/l/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E07E20_C390_8B5D_41D7_DBEAC9716594_0/l/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E07E20_C390_8B5D_41D7_DBEAC9716594_0/u/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E07E20_C390_8B5D_41D7_DBEAC9716594_0/u/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E07E20_C390_8B5D_41D7_DBEAC9716594_0/r/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E07E20_C390_8B5D_41D7_DBEAC9716594_0/r/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E07E20_C390_8B5D_41D7_DBEAC9716594_0/d/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E07E20_C390_8B5D_41D7_DBEAC9716594_0/d/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E07E20_C390_8B5D_41D7_DBEAC9716594_0/d/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C8E07E20_C390_8B5D_41D7_DBEAC9716594_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "backwardYaw": 127.47,
   "panorama": "this.panorama_C8E1F231_C38F_9BBF_41C7_8B73F57AA26D",
   "yaw": 144.86,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "backwardYaw": -169.06,
   "panorama": "this.panorama_ED9F2470_E6E6_C8FD_41E9_754A21DFFA46",
   "yaw": 0.76,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "backwardYaw": -145.32,
   "panorama": "this.panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A",
   "yaw": 136.35,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "backwardYaw": -157.54,
   "panorama": "this.panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068",
   "yaw": -124.51,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "thumbnailUrl": "media/panorama_C8E07E20_C390_8B5D_41D7_DBEAC9716594_t.jpg"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 11.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 337,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 11.5,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_118A5E95_004A_FB5E_414F_25F73E14E9E4_camera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -144.54,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_13F479B8_0618_AE12_418C_A581B0B388BA"
},
{
 "hfov": 360,
 "hfovMin": "150%",
 "class": "Panorama",
 "label": "3bhk bedroom03 02 28th",
 "id": "panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6",
 "overlays": [
  "this.overlay_DDE3106F_C64C_D85F_41C3_782CF613010E",
  "this.overlay_15CEF500_0608_67F2_415C_6AB7E6A6DB80"
 ],
 "pitch": 0,
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6_0/b/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6_0/b/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6_0/b/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6_0/f/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6_0/f/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6_0/f/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6_0/l/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6_0/l/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6_0/u/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6_0/u/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6_0/r/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6_0/r/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6_0/d/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6_0/d/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6_0/d/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "backwardYaw": 59.92,
   "panorama": "this.panorama_135DA583_0049_293A_414E_3C25985D46CB",
   "yaw": -93.92,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "backwardYaw": 34.74,
   "panorama": "this.panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B",
   "yaw": -49.75,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "thumbnailUrl": "media/panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6_t.jpg"
},
{
 "hfov": 360,
 "hfovMin": "150%",
 "class": "Panorama",
 "label": "3bhk bedroom02 23rd",
 "id": "panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590",
 "overlays": [
  "this.overlay_D7E43C95_C654_48C3_41D5_D441E8F4B5BE",
  "this.overlay_D78C34B1_C654_58C3_41C3_A038E40060B3",
  "this.overlay_130FD6F2_0049_28DA_4153_0942010BB82E"
 ],
 "pitch": 0,
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_0/b/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_0/b/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_0/b/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_0/f/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_0/f/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_0/f/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_0/l/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_0/l/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_0/u/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_0/u/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_0/r/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_0/r/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_0/d/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_0/d/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_0/d/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "backwardYaw": -61.42,
   "panorama": "this.panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2",
   "yaw": 33.02,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "backwardYaw": -5.52,
   "panorama": "this.panorama_11AC3D3D_004A_F94E_4142_D27F9A1181D7",
   "yaw": -118.62,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "backwardYaw": -123.79,
   "panorama": "this.panorama_C8E03182_C390_F962_41E3_AA944CB11FB1",
   "yaw": -157.27,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "thumbnailUrl": "media/panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_t.jpg"
},
{
 "hfov": 360,
 "hfovMin": "150%",
 "class": "Panorama",
 "label": "3bhk bedroom03 02 17th",
 "id": "panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4",
 "overlays": [
  "this.overlay_D7296732_C3F0_99BD_41CD_15546F96B28A",
  "this.overlay_1497DBE8_0678_E232_4180_BC51F5A3B938"
 ],
 "pitch": 0,
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4_0/b/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4_0/b/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4_0/b/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4_0/f/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4_0/f/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4_0/f/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4_0/l/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4_0/l/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4_0/u/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4_0/u/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4_0/r/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4_0/r/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4_0/d/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4_0/d/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4_0/d/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "backwardYaw": 44.28,
   "panorama": "this.panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A",
   "yaw": -50.85,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "backwardYaw": 60.43,
   "panorama": "this.panorama_0C72BAA0_0039_5B76_4145_C1EF94F793A0",
   "yaw": -93.55,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "thumbnailUrl": "media/panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4_t.jpg"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 54.29,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_10396A59_0618_A212_4194_EADE1FA43266"
},
{
 "hfov": 360,
 "hfovMin": "150%",
 "class": "Panorama",
 "label": "3bhk Passage 28th floor",
 "id": "panorama_C8E8EEF1_C391_88BE_41E1_593F441770DA",
 "overlays": [
  "this.overlay_D0EB7FEB_C674_4847_41D1_C5CAD7EE65EC",
  "this.overlay_D17567AD_C674_58C3_41C9_B73C22230BA4",
  "this.overlay_D11844E5_C674_7843_41DB_71EEDEBF776A"
 ],
 "pitch": 0,
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E8EEF1_C391_88BE_41E1_593F441770DA_0/b/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E8EEF1_C391_88BE_41E1_593F441770DA_0/b/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E8EEF1_C391_88BE_41E1_593F441770DA_0/b/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E8EEF1_C391_88BE_41E1_593F441770DA_0/f/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E8EEF1_C391_88BE_41E1_593F441770DA_0/f/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E8EEF1_C391_88BE_41E1_593F441770DA_0/f/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E8EEF1_C391_88BE_41E1_593F441770DA_0/l/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E8EEF1_C391_88BE_41E1_593F441770DA_0/l/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E8EEF1_C391_88BE_41E1_593F441770DA_0/u/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E8EEF1_C391_88BE_41E1_593F441770DA_0/u/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E8EEF1_C391_88BE_41E1_593F441770DA_0/r/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E8EEF1_C391_88BE_41E1_593F441770DA_0/r/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E8EEF1_C391_88BE_41E1_593F441770DA_0/d/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E8EEF1_C391_88BE_41E1_593F441770DA_0/d/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E8EEF1_C391_88BE_41E1_593F441770DA_0/d/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C8E8EEF1_C391_88BE_41E1_593F441770DA_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "backwardYaw": 6.94,
   "panorama": "this.panorama_C8E21D8B_C38F_8962_41E8_4ED88E72A8E4",
   "yaw": -4.73,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "backwardYaw": 5.82,
   "panorama": "this.panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9",
   "yaw": -77.5,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "backwardYaw": 151.46,
   "panorama": "this.panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B",
   "yaw": 35.45,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "thumbnailUrl": "media/panorama_C8E8EEF1_C391_88BE_41E1_593F441770DA_t.jpg"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_C8E03182_C390_F962_41E3_AA944CB11FB1_camera"
},
{
 "hfov": 360,
 "hfovMin": "150%",
 "class": "Panorama",
 "label": "3bhk bedroom02 2 23rd",
 "id": "panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5",
 "overlays": [
  "this.overlay_D409C066_C655_F841_41C2_9E382AAA888D",
  "this.overlay_D4F58EF9_C654_C843_41C9_E71581556A11"
 ],
 "pitch": 0,
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_0/b/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_0/b/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_0/b/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_0/f/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_0/f/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_0/f/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_0/l/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_0/l/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_0/u/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_0/u/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_0/r/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_0/r/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_0/d/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_0/d/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_0/d/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "backwardYaw": 135.94,
   "panorama": "this.panorama_C8E03182_C390_F962_41E3_AA944CB11FB1",
   "yaw": -145.19,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "backwardYaw": 75.99,
   "panorama": "this.panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9",
   "yaw": -20.79,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "thumbnailUrl": "media/panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_t.jpg"
},
{
 "hfov": 360,
 "hfovMin": "135%",
 "class": "Panorama",
 "label": "3bhk_bedroom01_toilet copy",
 "id": "panorama_0B55BDE4_0039_38FE_4139_E851DEBF7C58",
 "overlays": [
  "this.overlay_12802B79_0076_D9D6_40D5_A735950E3D00"
 ],
 "pitch": 0,
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0B55BDE4_0039_38FE_4139_E851DEBF7C58_0/b/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_0B55BDE4_0039_38FE_4139_E851DEBF7C58_0/b/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0B55BDE4_0039_38FE_4139_E851DEBF7C58_0/b/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0B55BDE4_0039_38FE_4139_E851DEBF7C58_0/f/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_0B55BDE4_0039_38FE_4139_E851DEBF7C58_0/f/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0B55BDE4_0039_38FE_4139_E851DEBF7C58_0/f/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_0B55BDE4_0039_38FE_4139_E851DEBF7C58_0/l/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0B55BDE4_0039_38FE_4139_E851DEBF7C58_0/l/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_0B55BDE4_0039_38FE_4139_E851DEBF7C58_0/u/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0B55BDE4_0039_38FE_4139_E851DEBF7C58_0/u/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_0B55BDE4_0039_38FE_4139_E851DEBF7C58_0/r/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0B55BDE4_0039_38FE_4139_E851DEBF7C58_0/r/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0B55BDE4_0039_38FE_4139_E851DEBF7C58_0/d/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_0B55BDE4_0039_38FE_4139_E851DEBF7C58_0/d/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0B55BDE4_0039_38FE_4139_E851DEBF7C58_0/d/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_0B55BDE4_0039_38FE_4139_E851DEBF7C58_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "backwardYaw": -120.13,
   "panorama": "this.panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5",
   "yaw": -3.63,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "thumbnailUrl": "media/panorama_0B55BDE4_0039_38FE_4139_E851DEBF7C58_t.jpg"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -26.75,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_12A55BF6_0618_A21E_418C_FDA525E984E9"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -44.06,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_107BBA10_0618_A211_4156_8F1722561380"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_camera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_118D55D0_004A_E8D6_412B_F15016B43EC0_camera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 129.15,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_138209C0_0618_AE72_4197_A39BB06A9E4A"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -54.18,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 8.7,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 342.6,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 8.7,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_130BB979_0618_AE12_4190_9892AAC8D408"
},
{
 "hfov": 360,
 "hfovMin": "150%",
 "class": "Panorama",
 "label": "3bhk bedroom03 02 106th",
 "id": "panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA",
 "overlays": [
  "this.overlay_E24DF921_C64C_C9C3_41E0_1DE050A43B4D",
  "this.overlay_12D086AB_0608_6236_4191_C3F4174FECF3"
 ],
 "pitch": 0,
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA_0/b/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA_0/b/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA_0/b/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA_0/f/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA_0/f/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA_0/f/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA_0/l/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA_0/l/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA_0/u/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA_0/u/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA_0/r/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA_0/r/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA_0/d/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA_0/d/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA_0/d/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "backwardYaw": 37.62,
   "panorama": "this.panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0",
   "yaw": -49.96,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_12B1E6F5_004A_E8DE_4153_B75256AABCDC"
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "thumbnailUrl": "media/panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA_t.jpg"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 54.29,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_116EBB0E_0618_A3F1_4171_0EC4CC376292"
},
{
 "hfov": 360,
 "hfovMin": "135%",
 "class": "Panorama",
 "label": "3bhk_bedroom01_toilet copy",
 "id": "panorama_118B7384_0049_E93E_4136_7E71C475A6E0",
 "overlays": [
  "this.overlay_17D9B17A_0059_69CA_412E_7A0DA76B62F0"
 ],
 "pitch": 0,
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_118B7384_0049_E93E_4136_7E71C475A6E0_0/b/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_118B7384_0049_E93E_4136_7E71C475A6E0_0/b/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_118B7384_0049_E93E_4136_7E71C475A6E0_0/b/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_118B7384_0049_E93E_4136_7E71C475A6E0_0/f/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_118B7384_0049_E93E_4136_7E71C475A6E0_0/f/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_118B7384_0049_E93E_4136_7E71C475A6E0_0/f/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_118B7384_0049_E93E_4136_7E71C475A6E0_0/l/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_118B7384_0049_E93E_4136_7E71C475A6E0_0/l/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_118B7384_0049_E93E_4136_7E71C475A6E0_0/u/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_118B7384_0049_E93E_4136_7E71C475A6E0_0/u/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_118B7384_0049_E93E_4136_7E71C475A6E0_0/r/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_118B7384_0049_E93E_4136_7E71C475A6E0_0/r/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_118B7384_0049_E93E_4136_7E71C475A6E0_0/d/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_118B7384_0049_E93E_4136_7E71C475A6E0_0/d/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_118B7384_0049_E93E_4136_7E71C475A6E0_0/d/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_118B7384_0049_E93E_4136_7E71C475A6E0_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A"
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "thumbnailUrl": "media/panorama_118B7384_0049_E93E_4136_7E71C475A6E0_t.jpg"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -62.27,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_10529CB2_0618_A611_4147_C05ADCFA4CF8"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 10.94,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_102E5CD8_0618_A612_4181_B254E4861B73"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -72.07,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_11D9BB49_0618_A273_4177_A20834322267"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 10.68,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_1350D961_0618_AE32_4195_7683EF86389E"
},
{
 "hfov": 360,
 "hfovMin": "150%",
 "class": "Panorama",
 "label": "3bhk kitchen",
 "id": "panorama_CF1013BA_C391_98A2_4167_0505D502E364",
 "overlays": [
  "this.overlay_D178C03E_C3F0_B7A5_41CB_0834EED7746E"
 ],
 "pitch": 0,
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CF1013BA_C391_98A2_4167_0505D502E364_0/b/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CF1013BA_C391_98A2_4167_0505D502E364_0/b/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CF1013BA_C391_98A2_4167_0505D502E364_0/b/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CF1013BA_C391_98A2_4167_0505D502E364_0/f/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CF1013BA_C391_98A2_4167_0505D502E364_0/f/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CF1013BA_C391_98A2_4167_0505D502E364_0/f/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CF1013BA_C391_98A2_4167_0505D502E364_0/l/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CF1013BA_C391_98A2_4167_0505D502E364_0/l/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CF1013BA_C391_98A2_4167_0505D502E364_0/u/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CF1013BA_C391_98A2_4167_0505D502E364_0/u/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CF1013BA_C391_98A2_4167_0505D502E364_0/r/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CF1013BA_C391_98A2_4167_0505D502E364_0/r/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CF1013BA_C391_98A2_4167_0505D502E364_0/d/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CF1013BA_C391_98A2_4167_0505D502E364_0/d/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CF1013BA_C391_98A2_4167_0505D502E364_0/d/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CF1013BA_C391_98A2_4167_0505D502E364_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "backwardYaw": -82.58,
   "panorama": "this.panorama_C857B562_C391_99A2_41D4_622CFBF52C0A",
   "yaw": 4.72,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "thumbnailUrl": "media/panorama_CF1013BA_C391_98A2_4167_0505D502E364_t.jpg"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -142.38,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_12906BE6_0618_A231_4182_2A98B5AFFC25"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 174.65,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_13B67CA2_0618_A636_4194_B222C573FD60"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -28.54,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_137FBC2E_0618_A631_4189_4E84247120D8"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 48.37,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_13362C5D_0618_A612_4187_C9C3CD70828C"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A_camera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 8.68,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_131B0981_0618_AEF2_4191_1705311A36F1"
},
{
 "hfov": 360,
 "hfovMin": "135%",
 "class": "Panorama",
 "label": "3bhk 01 hall 17th floor",
 "id": "panorama_C8443AAC_C390_88A6_41E1_B9756BC8A56B",
 "overlays": [
  "this.overlay_D3E76ABF_C3F1_88A2_41C2_2B986BB16AE4",
  "this.overlay_D33D2D6F_C3F0_89A3_41A0_BD4E7B18DF22",
  "this.overlay_D20E9669_C3F1_BBAF_41DD_B912974B3B2A",
  "this.overlay_E9702FC2_E6EE_D81D_4196_3D022E74FA68"
 ],
 "pitch": 0,
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8443AAC_C390_88A6_41E1_B9756BC8A56B_0/b/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8443AAC_C390_88A6_41E1_B9756BC8A56B_0/b/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8443AAC_C390_88A6_41E1_B9756BC8A56B_0/b/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8443AAC_C390_88A6_41E1_B9756BC8A56B_0/f/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8443AAC_C390_88A6_41E1_B9756BC8A56B_0/f/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8443AAC_C390_88A6_41E1_B9756BC8A56B_0/f/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8443AAC_C390_88A6_41E1_B9756BC8A56B_0/l/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8443AAC_C390_88A6_41E1_B9756BC8A56B_0/l/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8443AAC_C390_88A6_41E1_B9756BC8A56B_0/u/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8443AAC_C390_88A6_41E1_B9756BC8A56B_0/u/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8443AAC_C390_88A6_41E1_B9756BC8A56B_0/r/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8443AAC_C390_88A6_41E1_B9756BC8A56B_0/r/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8443AAC_C390_88A6_41E1_B9756BC8A56B_0/d/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8443AAC_C390_88A6_41E1_B9756BC8A56B_0/d/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8443AAC_C390_88A6_41E1_B9756BC8A56B_0/d/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C8443AAC_C390_88A6_41E1_B9756BC8A56B_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "backwardYaw": -146.66,
   "panorama": "this.panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9",
   "yaw": 135.92,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "backwardYaw": 125.82,
   "panorama": "this.panorama_C8E22910_C38F_897E_41BD_C3761AC35EAF",
   "yaw": 144.86,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "backwardYaw": -171.32,
   "panorama": "this.panorama_ED86F742_E6E7_4822_41BC_D0EBB6B298F9",
   "yaw": -0.24,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "backwardYaw": -158.37,
   "panorama": "this.panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5",
   "yaw": -125.71,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "thumbnailUrl": "media/panorama_C8443AAC_C390_88A6_41E1_B9756BC8A56B_t.jpg"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 33.34,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_137E7971_0618_AE12_4192_683FE3183BE0"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -145.7,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_13375998_0618_AE12_4197_2CA2D2C2241C"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 163.8,
  "pitch": 1.26
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_136FCF41_004A_D936_4151_FFADF2CFBA26_camera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -174.02,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_13D27C6C_0618_A632_4192_A702A9AD8D80"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -35.14,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_12D44B92_0618_A216_4198_0B904FB347A9"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -139.68,
  "pitch": -8.54
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23_camera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 115.9,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_10199A34_0618_A212_4197_15010B667665"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5_camera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 179.88,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_13A0E9D0_0618_AE12_4196_9201C0D0C7DA"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -118.44,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_1307EC3E_0618_A611_4178_52879C0A440E"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -56.99,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_13489951_0618_AE12_4153_674FDCC8495A"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_0B65F72F_0039_294A_413D_7167CFDDAD60_camera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 22.73,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 26.51
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 26.51
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 26.51
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_12BD1949_0618_AE72_417C_BA33B4637854"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -140.53,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_12FDFBBD_0618_A212_4192_53951EDC0C89"
},
{
 "hfov": 360,
 "hfovMin": "135%",
 "class": "Panorama",
 "label": "Powder toilet 3BHK",
 "id": "panorama_0DDD37F8_019B_0738_4165_2278D9DB7F90",
 "overlays": [
  "this.overlay_0EC38AAB_019F_09D8_4148_F13840F3A30E"
 ],
 "pitch": 0,
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0DDD37F8_019B_0738_4165_2278D9DB7F90_0/b/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_0DDD37F8_019B_0738_4165_2278D9DB7F90_0/b/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0DDD37F8_019B_0738_4165_2278D9DB7F90_0/b/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0DDD37F8_019B_0738_4165_2278D9DB7F90_0/f/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_0DDD37F8_019B_0738_4165_2278D9DB7F90_0/f/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0DDD37F8_019B_0738_4165_2278D9DB7F90_0/f/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_0DDD37F8_019B_0738_4165_2278D9DB7F90_0/l/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0DDD37F8_019B_0738_4165_2278D9DB7F90_0/l/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_0DDD37F8_019B_0738_4165_2278D9DB7F90_0/u/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0DDD37F8_019B_0738_4165_2278D9DB7F90_0/u/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_0DDD37F8_019B_0738_4165_2278D9DB7F90_0/r/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0DDD37F8_019B_0738_4165_2278D9DB7F90_0/r/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0DDD37F8_019B_0738_4165_2278D9DB7F90_0/d/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_0DDD37F8_019B_0738_4165_2278D9DB7F90_0/d/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0DDD37F8_019B_0738_4165_2278D9DB7F90_0/d/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_0DDD37F8_019B_0738_4165_2278D9DB7F90_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "backwardYaw": -55.84,
   "panorama": "this.panorama_C8E22910_C38F_897E_41BD_C3761AC35EAF",
   "yaw": 103.26,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "thumbnailUrl": "media/panorama_0DDD37F8_019B_0738_4165_2278D9DB7F90_t.jpg"
},
{
 "hfov": 360,
 "hfovMin": "135%",
 "class": "Panorama",
 "label": "3bhk_bed2_toilet copy",
 "id": "panorama_11906CBC_0049_DF4E_411B_4127E5D5F480",
 "overlays": [
  "this.overlay_18E3C57F_0057_29CA_4147_F4600E232D3B"
 ],
 "pitch": 0,
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_11906CBC_0049_DF4E_411B_4127E5D5F480_0/b/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_11906CBC_0049_DF4E_411B_4127E5D5F480_0/b/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_11906CBC_0049_DF4E_411B_4127E5D5F480_0/b/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_11906CBC_0049_DF4E_411B_4127E5D5F480_0/f/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_11906CBC_0049_DF4E_411B_4127E5D5F480_0/f/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_11906CBC_0049_DF4E_411B_4127E5D5F480_0/f/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_11906CBC_0049_DF4E_411B_4127E5D5F480_0/l/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_11906CBC_0049_DF4E_411B_4127E5D5F480_0/l/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_11906CBC_0049_DF4E_411B_4127E5D5F480_0/u/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_11906CBC_0049_DF4E_411B_4127E5D5F480_0/u/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_11906CBC_0049_DF4E_411B_4127E5D5F480_0/r/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_11906CBC_0049_DF4E_411B_4127E5D5F480_0/r/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_11906CBC_0049_DF4E_411B_4127E5D5F480_0/d/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_11906CBC_0049_DF4E_411B_4127E5D5F480_0/d/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_11906CBC_0049_DF4E_411B_4127E5D5F480_0/d/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_11906CBC_0049_DF4E_411B_4127E5D5F480_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "backwardYaw": 117.1,
   "panorama": "this.panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5",
   "yaw": -131.63,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "thumbnailUrl": "media/panorama_11906CBC_0049_DF4E_411B_4127E5D5F480_t.jpg"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 158.94,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_12E27BAC_0618_A232_4197_4BE77DFF436E"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 49.88,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_12ED2BA4_0618_A232_4195_1318CD779F79"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 122.74,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_139ABC8B_0618_A6F6_4197_7EBB25570951"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_camera"
},
{
 "hfov": 360,
 "hfovMin": "150%",
 "class": "Panorama",
 "label": "3bhk bedroom01 17th",
 "id": "panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23",
 "overlays": [
  "this.overlay_D1422BDB_C3F3_88E2_41BD_FA3D9EE50658"
 ],
 "pitch": 0,
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23_0/b/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23_0/b/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23_0/b/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23_0/f/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23_0/f/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23_0/f/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23_0/l/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23_0/l/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23_0/u/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23_0/u/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23_0/r/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23_0/r/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23_0/d/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23_0/d/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23_0/d/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "backwardYaw": 35.42,
   "panorama": "this.panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5",
   "yaw": -64.1,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "thumbnailUrl": "media/panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23_t.jpg"
},
{
 "hfov": 360,
 "hfovMin": "135%",
 "class": "Panorama",
 "label": "3bhk_BDRoom03_toilet copy",
 "id": "panorama_135DA583_0049_293A_414E_3C25985D46CB",
 "overlays": [
  "this.overlay_19FC6A44_0049_7B3E_4152_6EC2AFFF8366"
 ],
 "pitch": 0,
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_135DA583_0049_293A_414E_3C25985D46CB_0/b/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_135DA583_0049_293A_414E_3C25985D46CB_0/b/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_135DA583_0049_293A_414E_3C25985D46CB_0/b/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_135DA583_0049_293A_414E_3C25985D46CB_0/f/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_135DA583_0049_293A_414E_3C25985D46CB_0/f/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_135DA583_0049_293A_414E_3C25985D46CB_0/f/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_135DA583_0049_293A_414E_3C25985D46CB_0/l/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_135DA583_0049_293A_414E_3C25985D46CB_0/l/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_135DA583_0049_293A_414E_3C25985D46CB_0/u/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_135DA583_0049_293A_414E_3C25985D46CB_0/u/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_135DA583_0049_293A_414E_3C25985D46CB_0/r/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_135DA583_0049_293A_414E_3C25985D46CB_0/r/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_135DA583_0049_293A_414E_3C25985D46CB_0/d/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_135DA583_0049_293A_414E_3C25985D46CB_0/d/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_135DA583_0049_293A_414E_3C25985D46CB_0/d/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_135DA583_0049_293A_414E_3C25985D46CB_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "backwardYaw": -93.92,
   "panorama": "this.panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6",
   "yaw": 59.92,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "thumbnailUrl": "media/panorama_135DA583_0049_293A_414E_3C25985D46CB_t.jpg"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 160.03,
  "pitch": -6.28
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_11AC3D3D_004A_F94E_4142_D27F9A1181D7_camera"
},
{
 "hfov": 360,
 "hfovMin": "150%",
 "class": "Panorama",
 "label": "3bhk bedroom03 01 17th",
 "id": "panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A",
 "overlays": [
  "this.overlay_D7B8A38F_C3F7_B962_4174_75177DEADA11",
  "this.overlay_D7F45601_C3F0_BB5E_41C2_C0C993F67D5C"
 ],
 "pitch": 0,
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_0/b/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_0/b/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_0/b/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_0/f/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_0/f/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_0/f/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_0/l/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_0/l/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_0/u/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_0/u/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_0/r/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_0/r/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_0/d/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_0/d/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_0/d/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "backwardYaw": 35.46,
   "panorama": "this.panorama_C857B562_C391_99A2_41D4_622CFBF52C0A",
   "yaw": 153.25,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "backwardYaw": -50.85,
   "panorama": "this.panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4",
   "yaw": 44.28,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "thumbnailUrl": "media/panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_t.jpg"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_0E9BEAA3_0199_09C8_416E_D3D5D37321FD_camera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 159.21,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_13FE2C7C_0618_A612_4191_6FC3F20E8DB1"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 118.58,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 26.51
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 26.51
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 26.51
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_13B079D8_0618_AE12_4190_6D399792F34D"
},
{
 "hfov": 360,
 "hfovMin": "135%",
 "class": "Panorama",
 "label": "3bhk 01 hall 28th floor",
 "id": "panorama_C8E097E2_C390_F8A2_419E_45918FB20A48",
 "overlays": [
  "this.overlay_D3405AA1_C64C_48C3_41AC_D04C40137A31",
  "this.overlay_D3F9A377_C64C_384F_41A6_37339C461757",
  "this.overlay_D3B6FDAD_C64C_48C3_41CA_3934E98FB99D",
  "this.overlay_F66A4064_E6E5_48E5_41DD_EE48C967EACA"
 ],
 "pitch": 0,
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E097E2_C390_F8A2_419E_45918FB20A48_0/b/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E097E2_C390_F8A2_419E_45918FB20A48_0/b/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E097E2_C390_F8A2_419E_45918FB20A48_0/b/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E097E2_C390_F8A2_419E_45918FB20A48_0/f/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E097E2_C390_F8A2_419E_45918FB20A48_0/f/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E097E2_C390_F8A2_419E_45918FB20A48_0/f/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E097E2_C390_F8A2_419E_45918FB20A48_0/l/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E097E2_C390_F8A2_419E_45918FB20A48_0/l/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E097E2_C390_F8A2_419E_45918FB20A48_0/u/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E097E2_C390_F8A2_419E_45918FB20A48_0/u/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E097E2_C390_F8A2_419E_45918FB20A48_0/r/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E097E2_C390_F8A2_419E_45918FB20A48_0/r/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E097E2_C390_F8A2_419E_45918FB20A48_0/d/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E097E2_C390_F8A2_419E_45918FB20A48_0/d/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E097E2_C390_F8A2_419E_45918FB20A48_0/d/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C8E097E2_C390_F8A2_419E_45918FB20A48_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "backwardYaw": -163.03,
   "panorama": "this.panorama_ED4C0B8B_E6E7_5822_41E3_51E3E08986AA",
   "yaw": -1.88,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "backwardYaw": -148.21,
   "panorama": "this.panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0",
   "yaw": 136.48,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "backwardYaw": -158.16,
   "panorama": "this.panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A",
   "yaw": -125.71,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "backwardYaw": 127.05,
   "panorama": "this.panorama_C8E21D8B_C38F_8962_41E8_4ED88E72A8E4",
   "yaw": 153.23,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "thumbnailUrl": "media/panorama_C8E097E2_C390_F8A2_419E_45918FB20A48_t.jpg"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 176.37,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_10293A47_0618_A27E_4158_B2D334F7D5DE"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_camera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -52.95,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_11547D38_0618_A612_4188_510953FE1C3A"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 130.25,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_114F5AFD_0618_A212_418C_219FAB61ED50"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6_camera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -146.98,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 26.51
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 26.51
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 26.51
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_10DCECF0_0618_A611_4195_1FFFA4E0199F"
},
{
 "hfov": 360,
 "hfovMin": "150%",
 "class": "Panorama",
 "label": "3bhk kitchen",
 "id": "panorama_E609D5D6_C65C_5841_41DC_4408506ECD34",
 "overlays": [
  "this.overlay_E2FE88E0_C64D_C841_41C3_2E195A899599"
 ],
 "pitch": 0,
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E609D5D6_C65C_5841_41DC_4408506ECD34_0/b/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_E609D5D6_C65C_5841_41DC_4408506ECD34_0/b/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_E609D5D6_C65C_5841_41DC_4408506ECD34_0/b/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E609D5D6_C65C_5841_41DC_4408506ECD34_0/f/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_E609D5D6_C65C_5841_41DC_4408506ECD34_0/f/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_E609D5D6_C65C_5841_41DC_4408506ECD34_0/f/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_E609D5D6_C65C_5841_41DC_4408506ECD34_0/l/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_E609D5D6_C65C_5841_41DC_4408506ECD34_0/l/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_E609D5D6_C65C_5841_41DC_4408506ECD34_0/u/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_E609D5D6_C65C_5841_41DC_4408506ECD34_0/u/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_E609D5D6_C65C_5841_41DC_4408506ECD34_0/r/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_E609D5D6_C65C_5841_41DC_4408506ECD34_0/r/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E609D5D6_C65C_5841_41DC_4408506ECD34_0/d/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_E609D5D6_C65C_5841_41DC_4408506ECD34_0/d/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_E609D5D6_C65C_5841_41DC_4408506ECD34_0/d/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_E609D5D6_C65C_5841_41DC_4408506ECD34_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "backwardYaw": -81.21,
   "panorama": "this.panorama_C8E84376_C391_79A5_41A5_D6230668BC5C",
   "yaw": 6.37,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "thumbnailUrl": "media/panorama_E609D5D6_C65C_5841_41DC_4408506ECD34_t.jpg"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 16.97,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_10A67D20_0618_A632_4191_2F63E8BC2EAC"
},
{
 "hfov": 360,
 "hfovMin": "150%",
 "class": "Panorama",
 "label": "3bhk bedroom03 01 23rd",
 "id": "panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7",
 "overlays": [
  "this.overlay_D52AF8AA_C65C_C8C1_41E1_368B77920405",
  "this.overlay_D5F4BE96_C654_C8C1_41E5_91FDE5D191D9"
 ],
 "pitch": 0,
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_0/b/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_0/b/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_0/b/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_0/f/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_0/f/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_0/f/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_0/l/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_0/l/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_0/u/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_0/u/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_0/r/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_0/r/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_0/d/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_0/d/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_0/d/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C8E759F9_C391_88AE_41D0_5C4EF78B7034"
  },
  {
   "class": "AdjacentPanorama",
   "backwardYaw": -54.9,
   "panorama": "this.panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D",
   "yaw": 43.8,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "thumbnailUrl": "media/panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_t.jpg"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_camera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 99.07,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_108A7D08_0618_A7F2_418D_A8583159699A"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -142.34,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_10D57A92_0618_A211_4194_559C4575F730"
},
{
 "hfov": 360,
 "hfovMin": "135%",
 "class": "Panorama",
 "label": "Powder toilet 3BHK",
 "id": "panorama_0E9BEAA3_0199_09C8_416E_D3D5D37321FD",
 "overlays": [
  "this.overlay_105CC9D2_01A7_0B48_4158_008E8092F603"
 ],
 "pitch": 0,
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0E9BEAA3_0199_09C8_416E_D3D5D37321FD_0/b/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_0E9BEAA3_0199_09C8_416E_D3D5D37321FD_0/b/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0E9BEAA3_0199_09C8_416E_D3D5D37321FD_0/b/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0E9BEAA3_0199_09C8_416E_D3D5D37321FD_0/f/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_0E9BEAA3_0199_09C8_416E_D3D5D37321FD_0/f/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0E9BEAA3_0199_09C8_416E_D3D5D37321FD_0/f/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_0E9BEAA3_0199_09C8_416E_D3D5D37321FD_0/l/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0E9BEAA3_0199_09C8_416E_D3D5D37321FD_0/l/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_0E9BEAA3_0199_09C8_416E_D3D5D37321FD_0/u/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0E9BEAA3_0199_09C8_416E_D3D5D37321FD_0/u/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_0E9BEAA3_0199_09C8_416E_D3D5D37321FD_0/r/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0E9BEAA3_0199_09C8_416E_D3D5D37321FD_0/r/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0E9BEAA3_0199_09C8_416E_D3D5D37321FD_0/d/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_0E9BEAA3_0199_09C8_416E_D3D5D37321FD_0/d/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0E9BEAA3_0199_09C8_416E_D3D5D37321FD_0/d/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_0E9BEAA3_0199_09C8_416E_D3D5D37321FD_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "backwardYaw": -56.51,
   "panorama": "this.panorama_C8E21D8B_C38F_8962_41E8_4ED88E72A8E4",
   "yaw": 105.8,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "thumbnailUrl": "media/panorama_0E9BEAA3_0199_09C8_416E_D3D5D37321FD_t.jpg"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_ED86F742_E6E7_4822_41BC_D0EBB6B298F9_camera"
},
{
 "hfov": 360,
 "hfovMin": "135%",
 "class": "Panorama",
 "label": "3bhk_bedroom01_toilet copy",
 "id": "panorama_11AC3D3D_004A_F94E_4142_D27F9A1181D7",
 "overlays": [
  "this.overlay_146737F2_0057_E8DA_4155_00C91D7C48D2"
 ],
 "pitch": 0,
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_11AC3D3D_004A_F94E_4142_D27F9A1181D7_0/b/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_11AC3D3D_004A_F94E_4142_D27F9A1181D7_0/b/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_11AC3D3D_004A_F94E_4142_D27F9A1181D7_0/b/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_11AC3D3D_004A_F94E_4142_D27F9A1181D7_0/f/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_11AC3D3D_004A_F94E_4142_D27F9A1181D7_0/f/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_11AC3D3D_004A_F94E_4142_D27F9A1181D7_0/f/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_11AC3D3D_004A_F94E_4142_D27F9A1181D7_0/l/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_11AC3D3D_004A_F94E_4142_D27F9A1181D7_0/l/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_11AC3D3D_004A_F94E_4142_D27F9A1181D7_0/u/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_11AC3D3D_004A_F94E_4142_D27F9A1181D7_0/u/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_11AC3D3D_004A_F94E_4142_D27F9A1181D7_0/r/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_11AC3D3D_004A_F94E_4142_D27F9A1181D7_0/r/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_11AC3D3D_004A_F94E_4142_D27F9A1181D7_0/d/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_11AC3D3D_004A_F94E_4142_D27F9A1181D7_0/d/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_11AC3D3D_004A_F94E_4142_D27F9A1181D7_0/d/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_11AC3D3D_004A_F94E_4142_D27F9A1181D7_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "backwardYaw": -118.62,
   "panorama": "this.panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590",
   "yaw": -5.52,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "thumbnailUrl": "media/panorama_11AC3D3D_004A_F94E_4142_D27F9A1181D7_t.jpg"
},
{
 "hfov": 360,
 "hfovMin": "150%",
 "class": "Panorama",
 "label": "3bhk bedroom01 28th",
 "id": "panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5",
 "overlays": [
  "this.overlay_DEEEAE21_C674_CBC3_41DF_981A8131049C"
 ],
 "pitch": 0,
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5_0/b/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5_0/b/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5_0/b/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5_0/f/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5_0/f/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5_0/f/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5_0/l/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5_0/l/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5_0/u/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5_0/u/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5_0/r/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5_0/r/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5_0/d/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5_0/d/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5_0/d/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "backwardYaw": 39.47,
   "panorama": "this.panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A",
   "yaw": -65.68,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "thumbnailUrl": "media/panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5_t.jpg"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_camera"
},
{
 "hfov": 360,
 "hfovMin": "135%",
 "class": "Panorama",
 "label": "3bhk 01 hall 23rd floor",
 "id": "panorama_C8E03182_C390_F962_41E3_AA944CB11FB1",
 "overlays": [
  "this.overlay_C8D35665_C635_D843_41C9_9D8B672250E4",
  "this.overlay_C90800DC_C634_F841_41DC_32CC6E30E91E",
  "this.overlay_C9007F6B_C637_C847_41AC_9B1840EF4CA4",
  "this.overlay_E91B578A_E6EB_C822_41E0_D3C517571420"
 ],
 "pitch": 0,
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E03182_C390_F962_41E3_AA944CB11FB1_0/b/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E03182_C390_F962_41E3_AA944CB11FB1_0/b/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E03182_C390_F962_41E3_AA944CB11FB1_0/b/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E03182_C390_F962_41E3_AA944CB11FB1_0/f/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E03182_C390_F962_41E3_AA944CB11FB1_0/f/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E03182_C390_F962_41E3_AA944CB11FB1_0/f/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E03182_C390_F962_41E3_AA944CB11FB1_0/l/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E03182_C390_F962_41E3_AA944CB11FB1_0/l/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E03182_C390_F962_41E3_AA944CB11FB1_0/u/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E03182_C390_F962_41E3_AA944CB11FB1_0/u/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E03182_C390_F962_41E3_AA944CB11FB1_0/r/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E03182_C390_F962_41E3_AA944CB11FB1_0/r/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E03182_C390_F962_41E3_AA944CB11FB1_0/d/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E03182_C390_F962_41E3_AA944CB11FB1_0/d/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E03182_C390_F962_41E3_AA944CB11FB1_0/d/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C8E03182_C390_F962_41E3_AA944CB11FB1_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "backwardYaw": -157.27,
   "panorama": "this.panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590",
   "yaw": -123.79,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "backwardYaw": 123.01,
   "panorama": "this.panorama_C845D458_C38F_7FEE_41AF_209B05ABC3B4",
   "yaw": 146.64,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "backwardYaw": -145.19,
   "panorama": "this.panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5",
   "yaw": 135.94,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "backwardYaw": -169.32,
   "panorama": "this.panorama_ED9C7DE8_E6E7_3BEE_41CC_66F6977CF4A0",
   "yaw": -0.12,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "thumbnailUrl": "media/panorama_C8E03182_C390_F962_41E3_AA944CB11FB1_t.jpg"
},
{
 "hfov": 360,
 "hfovMin": "135%",
 "class": "Panorama",
 "label": "3bhk_bed2_toilet copy",
 "id": "panorama_11B27642_004A_EB3A_4142_7CBC8EFC0A22",
 "overlays": [
  "this.overlay_1419C47C_0059_EFCE_4151_9254754CC460"
 ],
 "pitch": 0,
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_11B27642_004A_EB3A_4142_7CBC8EFC0A22_0/b/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_11B27642_004A_EB3A_4142_7CBC8EFC0A22_0/b/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_11B27642_004A_EB3A_4142_7CBC8EFC0A22_0/b/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_11B27642_004A_EB3A_4142_7CBC8EFC0A22_0/f/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_11B27642_004A_EB3A_4142_7CBC8EFC0A22_0/f/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_11B27642_004A_EB3A_4142_7CBC8EFC0A22_0/f/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_11B27642_004A_EB3A_4142_7CBC8EFC0A22_0/l/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_11B27642_004A_EB3A_4142_7CBC8EFC0A22_0/l/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_11B27642_004A_EB3A_4142_7CBC8EFC0A22_0/u/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_11B27642_004A_EB3A_4142_7CBC8EFC0A22_0/u/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_11B27642_004A_EB3A_4142_7CBC8EFC0A22_0/r/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_11B27642_004A_EB3A_4142_7CBC8EFC0A22_0/r/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_11B27642_004A_EB3A_4142_7CBC8EFC0A22_0/d/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_11B27642_004A_EB3A_4142_7CBC8EFC0A22_0/d/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_11B27642_004A_EB3A_4142_7CBC8EFC0A22_0/d/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_11B27642_004A_EB3A_4142_7CBC8EFC0A22_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "backwardYaw": 118.11,
   "panorama": "this.panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9",
   "yaw": -130.75,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "thumbnailUrl": "media/panorama_11B27642_004A_EB3A_4142_7CBC8EFC0A22_t.jpg"
},
{
 "hfov": 360,
 "hfovMin": "150%",
 "class": "Panorama",
 "label": "3bhk bedroom02 2 33rd",
 "id": "panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A",
 "overlays": [
  "this.overlay_E468F0B7_C654_58CF_41DE_C89AEED028EF",
  "this.overlay_E4E80CAC_C657_C8C1_41D8_7F180578F07D"
 ],
 "pitch": 0,
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_0/b/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_0/b/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_0/b/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_0/f/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_0/f/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_0/f/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_0/l/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_0/l/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_0/u/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_0/u/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_0/r/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_0/r/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_0/d/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_0/d/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_0/d/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "backwardYaw": 136.35,
   "panorama": "this.panorama_C8E07E20_C390_8B5D_41D7_DBEAC9716594",
   "yaw": -145.32,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A"
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "thumbnailUrl": "media/panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_t.jpg"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_camera"
},
{
 "hfov": 360,
 "hfovMin": "135%",
 "class": "Panorama",
 "label": "Powder toilet 3BHK",
 "id": "panorama_0EF390FE_019F_1938_4173_7E5BC178F7F6",
 "overlays": [
  "this.overlay_11D521B2_019B_1BC8_416F_DC66A9296BC0"
 ],
 "pitch": 0,
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0EF390FE_019F_1938_4173_7E5BC178F7F6_0/b/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_0EF390FE_019F_1938_4173_7E5BC178F7F6_0/b/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0EF390FE_019F_1938_4173_7E5BC178F7F6_0/b/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0EF390FE_019F_1938_4173_7E5BC178F7F6_0/f/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_0EF390FE_019F_1938_4173_7E5BC178F7F6_0/f/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0EF390FE_019F_1938_4173_7E5BC178F7F6_0/f/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_0EF390FE_019F_1938_4173_7E5BC178F7F6_0/l/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0EF390FE_019F_1938_4173_7E5BC178F7F6_0/l/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_0EF390FE_019F_1938_4173_7E5BC178F7F6_0/u/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0EF390FE_019F_1938_4173_7E5BC178F7F6_0/u/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_0EF390FE_019F_1938_4173_7E5BC178F7F6_0/r/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0EF390FE_019F_1938_4173_7E5BC178F7F6_0/r/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0EF390FE_019F_1938_4173_7E5BC178F7F6_0/d/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_0EF390FE_019F_1938_4173_7E5BC178F7F6_0/d/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0EF390FE_019F_1938_4173_7E5BC178F7F6_0/d/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_0EF390FE_019F_1938_4173_7E5BC178F7F6_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "backwardYaw": -57.26,
   "panorama": "this.panorama_C845D458_C38F_7FEE_41AF_209B05ABC3B4",
   "yaw": 103.66,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "thumbnailUrl": "media/panorama_0EF390FE_019F_1938_4173_7E5BC178F7F6_t.jpg"
},
{
 "hfov": 360,
 "hfovMin": "150%",
 "class": "Panorama",
 "label": "3bhk 02 entrance 28th floor",
 "id": "panorama_C8E21D8B_C38F_8962_41E8_4ED88E72A8E4",
 "overlays": [
  "this.overlay_D23040EA_C64C_D841_41DD_F09C37DF4C5B",
  "this.overlay_D29C36D7_C64C_384F_41E4_FDFADB56E550",
  "this.overlay_10608B0B_0199_08D8_4160_B730FA25DF4F"
 ],
 "pitch": 0,
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E21D8B_C38F_8962_41E8_4ED88E72A8E4_0/b/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E21D8B_C38F_8962_41E8_4ED88E72A8E4_0/b/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E21D8B_C38F_8962_41E8_4ED88E72A8E4_0/b/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E21D8B_C38F_8962_41E8_4ED88E72A8E4_0/f/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E21D8B_C38F_8962_41E8_4ED88E72A8E4_0/f/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E21D8B_C38F_8962_41E8_4ED88E72A8E4_0/f/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E21D8B_C38F_8962_41E8_4ED88E72A8E4_0/l/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E21D8B_C38F_8962_41E8_4ED88E72A8E4_0/l/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E21D8B_C38F_8962_41E8_4ED88E72A8E4_0/u/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E21D8B_C38F_8962_41E8_4ED88E72A8E4_0/u/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E21D8B_C38F_8962_41E8_4ED88E72A8E4_0/r/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E21D8B_C38F_8962_41E8_4ED88E72A8E4_0/r/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E21D8B_C38F_8962_41E8_4ED88E72A8E4_0/d/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E21D8B_C38F_8962_41E8_4ED88E72A8E4_0/d/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E21D8B_C38F_8962_41E8_4ED88E72A8E4_0/d/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C8E21D8B_C38F_8962_41E8_4ED88E72A8E4_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "backwardYaw": 105.8,
   "panorama": "this.panorama_0E9BEAA3_0199_09C8_416E_D3D5D37321FD",
   "yaw": -56.51,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "backwardYaw": 153.23,
   "panorama": "this.panorama_C8E097E2_C390_F8A2_419E_45918FB20A48",
   "yaw": 127.05,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "backwardYaw": -4.73,
   "panorama": "this.panorama_C8E8EEF1_C391_88BE_41E1_593F441770DA",
   "yaw": 6.94,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "thumbnailUrl": "media/panorama_C8E21D8B_C38F_8962_41E8_4ED88E72A8E4_t.jpg"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 175.16,
  "pitch": -0.27
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_C8E1F231_C38F_9BBF_41C7_8B73F57AA26D_camera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 178.12,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_10C68A7E_0618_A20E_4194_7EA011EA8D10"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -144.7,
  "pitch": -9.3
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_0C72BAA0_0039_5B76_4145_C1EF94F793A0_camera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 124.31,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_12982BDD_0618_A212_4191_C2CF7EA2635B"
},
{
 "vfov": 180,
 "hfovMax": 130,
 "hfovMin": "135%",
 "class": "Panorama",
 "label": "3bhk_BDRoom03_toilet copy",
 "id": "panorama_12B1E6F5_004A_E8DE_4153_B75256AABCDC",
 "partial": false,
 "pitch": 0,
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_12B1E6F5_004A_E8DE_4153_B75256AABCDC_0/b/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_12B1E6F5_004A_E8DE_4153_B75256AABCDC_0/b/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_12B1E6F5_004A_E8DE_4153_B75256AABCDC_0/b/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_12B1E6F5_004A_E8DE_4153_B75256AABCDC_0/f/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_12B1E6F5_004A_E8DE_4153_B75256AABCDC_0/f/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_12B1E6F5_004A_E8DE_4153_B75256AABCDC_0/f/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_12B1E6F5_004A_E8DE_4153_B75256AABCDC_0/l/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_12B1E6F5_004A_E8DE_4153_B75256AABCDC_0/l/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_12B1E6F5_004A_E8DE_4153_B75256AABCDC_0/u/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_12B1E6F5_004A_E8DE_4153_B75256AABCDC_0/u/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_12B1E6F5_004A_E8DE_4153_B75256AABCDC_0/r/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_12B1E6F5_004A_E8DE_4153_B75256AABCDC_0/r/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_12B1E6F5_004A_E8DE_4153_B75256AABCDC_0/d/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_12B1E6F5_004A_E8DE_4153_B75256AABCDC_0/d/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_12B1E6F5_004A_E8DE_4153_B75256AABCDC_0/d/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_12B1E6F5_004A_E8DE_4153_B75256AABCDC_t.jpg"
  }
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_12B1E6F5_004A_E8DE_4153_B75256AABCDC_t.jpg"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 26.51
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 26.51
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 26.51
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_camera"
},
{
 "hfov": 360,
 "hfovMin": "135%",
 "class": "Panorama",
 "label": "3BHK_Bolcony_33",
 "id": "panorama_ED9F2470_E6E6_C8FD_41E9_754A21DFFA46",
 "overlays": [
  "this.overlay_F4E33909_E6E5_582E_41E2_8DFE91F0764C"
 ],
 "pitch": 0,
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ED9F2470_E6E6_C8FD_41E9_754A21DFFA46_0/b/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_ED9F2470_E6E6_C8FD_41E9_754A21DFFA46_0/b/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_ED9F2470_E6E6_C8FD_41E9_754A21DFFA46_0/b/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ED9F2470_E6E6_C8FD_41E9_754A21DFFA46_0/f/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_ED9F2470_E6E6_C8FD_41E9_754A21DFFA46_0/f/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_ED9F2470_E6E6_C8FD_41E9_754A21DFFA46_0/f/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "url": "media/panorama_ED9F2470_E6E6_C8FD_41E9_754A21DFFA46_0/l/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_ED9F2470_E6E6_C8FD_41E9_754A21DFFA46_0/l/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_ED9F2470_E6E6_C8FD_41E9_754A21DFFA46_0/l/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "url": "media/panorama_ED9F2470_E6E6_C8FD_41E9_754A21DFFA46_0/u/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_ED9F2470_E6E6_C8FD_41E9_754A21DFFA46_0/u/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_ED9F2470_E6E6_C8FD_41E9_754A21DFFA46_0/u/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "url": "media/panorama_ED9F2470_E6E6_C8FD_41E9_754A21DFFA46_0/r/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_ED9F2470_E6E6_C8FD_41E9_754A21DFFA46_0/r/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_ED9F2470_E6E6_C8FD_41E9_754A21DFFA46_0/r/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ED9F2470_E6E6_C8FD_41E9_754A21DFFA46_0/d/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_ED9F2470_E6E6_C8FD_41E9_754A21DFFA46_0/d/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_ED9F2470_E6E6_C8FD_41E9_754A21DFFA46_0/d/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_ED9F2470_E6E6_C8FD_41E9_754A21DFFA46_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "backwardYaw": 0.76,
   "panorama": "this.panorama_C8E07E20_C390_8B5D_41D7_DBEAC9716594",
   "yaw": -169.06,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "thumbnailUrl": "media/panorama_ED9F2470_E6E6_C8FD_41E9_754A21DFFA46_t.jpg"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_E609D5D6_C65C_5841_41DC_4408506ECD34_camera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -173.92,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_111BEB26_0618_A23E_417D_01748EE085F8"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 42.21,
  "pitch": 2.01
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_camera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -116.82,
  "pitch": 2.76
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D_camera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_camera"
},
{
 "hfov": 360,
 "hfovMin": "150%",
 "class": "Panorama",
 "label": "3bhk bedroom02 2 28th",
 "id": "panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0",
 "overlays": [
  "this.overlay_DF50E086_C674_38C1_41C4_7464DFF3A926",
  "this.overlay_DFC10996_C674_48CE_41D4_631A257C6571"
 ],
 "pitch": 0,
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_0/b/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_0/b/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_0/b/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_0/f/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_0/f/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_0/f/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_0/l/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_0/l/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_0/u/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_0/u/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_0/r/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_0/r/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_0/d/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_0/d/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_0/d/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "backwardYaw": 136.48,
   "panorama": "this.panorama_C8E097E2_C390_F8A2_419E_45918FB20A48",
   "yaw": -148.21,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "backwardYaw": 88.07,
   "panorama": "this.panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5",
   "yaw": -21.75,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "thumbnailUrl": "media/panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_t.jpg"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_camera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 169.94,
  "pitch": 0.55
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_C845D458_C38F_7FEE_41AF_209B05ABC3B4_camera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_C8E84376_C391_79A5_41A5_D6230668BC5C_camera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -91.18,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_13D619A8_0618_AE32_417D_578ED58BAADE"
},
{
 "hfov": 360,
 "hfovMin": "135%",
 "class": "Panorama",
 "label": "3bhk_BDRoom03_toilet copy",
 "id": "panorama_0C72BAA0_0039_5B76_4145_C1EF94F793A0",
 "overlays": [
  "this.overlay_117BAD49_0079_5936_4155_38DBB5BBB748"
 ],
 "pitch": 0,
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0C72BAA0_0039_5B76_4145_C1EF94F793A0_0/b/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_0C72BAA0_0039_5B76_4145_C1EF94F793A0_0/b/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0C72BAA0_0039_5B76_4145_C1EF94F793A0_0/b/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0C72BAA0_0039_5B76_4145_C1EF94F793A0_0/f/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_0C72BAA0_0039_5B76_4145_C1EF94F793A0_0/f/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0C72BAA0_0039_5B76_4145_C1EF94F793A0_0/f/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_0C72BAA0_0039_5B76_4145_C1EF94F793A0_0/l/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0C72BAA0_0039_5B76_4145_C1EF94F793A0_0/l/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_0C72BAA0_0039_5B76_4145_C1EF94F793A0_0/u/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0C72BAA0_0039_5B76_4145_C1EF94F793A0_0/u/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_0C72BAA0_0039_5B76_4145_C1EF94F793A0_0/r/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0C72BAA0_0039_5B76_4145_C1EF94F793A0_0/r/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0C72BAA0_0039_5B76_4145_C1EF94F793A0_0/d/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_0C72BAA0_0039_5B76_4145_C1EF94F793A0_0/d/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0C72BAA0_0039_5B76_4145_C1EF94F793A0_0/d/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_0C72BAA0_0039_5B76_4145_C1EF94F793A0_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "backwardYaw": -93.55,
   "panorama": "this.panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4",
   "yaw": 60.43,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "thumbnailUrl": "media/panorama_0C72BAA0_0039_5B76_4145_C1EF94F793A0_t.jpg"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 31.79,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_10B59D27_0618_A63E_4195_E456D776710A"
},
{
 "class": "PlayList",
 "items": [
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 0, 1)",
   "media": "this.panorama_C8E22910_C38F_897E_41BD_C3761AC35EAF",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C8E22910_C38F_897E_41BD_C3761AC35EAF_camera"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 1, 2)",
   "media": "this.panorama_C8443AAC_C390_88A6_41E1_B9756BC8A56B",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C8443AAC_C390_88A6_41E1_B9756BC8A56B_camera"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 2, 3)",
   "media": "this.panorama_ED86F742_E6E7_4822_41BC_D0EBB6B298F9",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_ED86F742_E6E7_4822_41BC_D0EBB6B298F9_camera"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 3, 4)",
   "media": "this.panorama_0DDD37F8_019B_0738_4165_2278D9DB7F90",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_0DDD37F8_019B_0738_4165_2278D9DB7F90_camera"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 4, 5)",
   "media": "this.panorama_C857B562_C391_99A2_41D4_622CFBF52C0A",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_camera"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 5, 6)",
   "media": "this.panorama_CF1013BA_C391_98A2_4167_0505D502E364",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_CF1013BA_C391_98A2_4167_0505D502E364_camera"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 6, 7)",
   "media": "this.panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_camera"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 7, 8)",
   "media": "this.panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23_camera"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 8, 9)",
   "media": "this.panorama_0B55BDE4_0039_38FE_4139_E851DEBF7C58",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_0B55BDE4_0039_38FE_4139_E851DEBF7C58_camera"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 9, 10)",
   "media": "this.panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_camera"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 10, 11)",
   "media": "this.panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40_camera"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 11, 12)",
   "media": "this.panorama_0B65F72F_0039_294A_413D_7167CFDDAD60",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_0B65F72F_0039_294A_413D_7167CFDDAD60_camera"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 12, 13)",
   "media": "this.panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_camera"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 13, 14)",
   "media": "this.panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4_camera"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 14, 15)",
   "media": "this.panorama_0C72BAA0_0039_5B76_4145_C1EF94F793A0",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_0C72BAA0_0039_5B76_4145_C1EF94F793A0_camera"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 15, 16)",
   "media": "this.panorama_C845D458_C38F_7FEE_41AF_209B05ABC3B4",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C845D458_C38F_7FEE_41AF_209B05ABC3B4_camera"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 16, 17)",
   "media": "this.panorama_C8E03182_C390_F962_41E3_AA944CB11FB1",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C8E03182_C390_F962_41E3_AA944CB11FB1_camera"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 17, 18)",
   "media": "this.panorama_ED9C7DE8_E6E7_3BEE_41CC_66F6977CF4A0",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_ED9C7DE8_E6E7_3BEE_41CC_66F6977CF4A0_camera"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 18, 19)",
   "media": "this.panorama_0EF390FE_019F_1938_4173_7E5BC178F7F6",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_0EF390FE_019F_1938_4173_7E5BC178F7F6_camera"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 19, 20)",
   "media": "this.panorama_C8E759F9_C391_88AE_41D0_5C4EF78B7034",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C8E759F9_C391_88AE_41D0_5C4EF78B7034_camera"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 20, 21)",
   "media": "this.panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA_camera"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 21, 22)",
   "media": "this.panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_camera"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 22, 23)",
   "media": "this.panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2_camera"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 23, 24)",
   "media": "this.panorama_11AC3D3D_004A_F94E_4142_D27F9A1181D7",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_11AC3D3D_004A_F94E_4142_D27F9A1181D7_camera"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 24, 25)",
   "media": "this.panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_camera"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 25, 26)",
   "media": "this.panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9_camera"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 26, 27)",
   "media": "this.panorama_11B27642_004A_EB3A_4142_7CBC8EFC0A22",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_11B27642_004A_EB3A_4142_7CBC8EFC0A22_camera"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 27, 28)",
   "media": "this.panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_camera"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 28, 29)",
   "media": "this.panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D_camera"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 29, 30)",
   "media": "this.panorama_136FCF41_004A_D936_4151_FFADF2CFBA26",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_136FCF41_004A_D936_4151_FFADF2CFBA26_camera"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 30, 31)",
   "media": "this.panorama_C8E21D8B_C38F_8962_41E8_4ED88E72A8E4",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C8E21D8B_C38F_8962_41E8_4ED88E72A8E4_camera"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 31, 32)",
   "media": "this.panorama_C8E097E2_C390_F8A2_419E_45918FB20A48",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C8E097E2_C390_F8A2_419E_45918FB20A48_camera"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 32, 33)",
   "media": "this.panorama_ED4C0B8B_E6E7_5822_41E3_51E3E08986AA",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_ED4C0B8B_E6E7_5822_41E3_51E3E08986AA_camera"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 33, 34)",
   "media": "this.panorama_0E9BEAA3_0199_09C8_416E_D3D5D37321FD",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_0E9BEAA3_0199_09C8_416E_D3D5D37321FD_camera"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 34, 35)",
   "media": "this.panorama_C8E8EEF1_C391_88BE_41E1_593F441770DA",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C8E8EEF1_C391_88BE_41E1_593F441770DA_camera"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 35, 36)",
   "media": "this.panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9_camera"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 36, 37)",
   "media": "this.panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_camera"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 37, 38)",
   "media": "this.panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5_camera"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 38, 39)",
   "media": "this.panorama_118B7384_0049_E93E_4136_7E71C475A6E0",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_118B7384_0049_E93E_4136_7E71C475A6E0_camera"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 39, 40)",
   "media": "this.panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_camera"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 40, 41)",
   "media": "this.panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5_camera"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 41, 42)",
   "media": "this.panorama_11906CBC_0049_DF4E_411B_4127E5D5F480",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_11906CBC_0049_DF4E_411B_4127E5D5F480_camera"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 42, 43)",
   "media": "this.panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_camera"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 43, 44)",
   "media": "this.panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6_camera"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 44, 45)",
   "media": "this.panorama_135DA583_0049_293A_414E_3C25985D46CB",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_135DA583_0049_293A_414E_3C25985D46CB_camera"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 45, 46)",
   "media": "this.panorama_C8E1F231_C38F_9BBF_41C7_8B73F57AA26D",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C8E1F231_C38F_9BBF_41C7_8B73F57AA26D_camera"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 46, 47)",
   "media": "this.panorama_C8E07E20_C390_8B5D_41D7_DBEAC9716594",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C8E07E20_C390_8B5D_41D7_DBEAC9716594_camera"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 47, 48)",
   "media": "this.panorama_ED9F2470_E6E6_C8FD_41E9_754A21DFFA46",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_ED9F2470_E6E6_C8FD_41E9_754A21DFFA46_camera"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 48, 49)",
   "media": "this.panorama_0F2964AA_0199_39D8_415C_DAB75F704D09",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_0F2964AA_0199_39D8_415C_DAB75F704D09_camera"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 49, 50)",
   "media": "this.panorama_C8E84376_C391_79A5_41A5_D6230668BC5C",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C8E84376_C391_79A5_41A5_D6230668BC5C_camera"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 50, 51)",
   "media": "this.panorama_E609D5D6_C65C_5841_41DC_4408506ECD34",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E609D5D6_C65C_5841_41DC_4408506ECD34_camera"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 51, 52)",
   "media": "this.panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_camera"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 52, 53)",
   "media": "this.panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D_camera"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 53, 54)",
   "media": "this.panorama_118D55D0_004A_E8D6_412B_F15016B43EC0",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_118D55D0_004A_E8D6_412B_F15016B43EC0_camera"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 54, 55)",
   "media": "this.panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_camera"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 55, 56)",
   "media": "this.panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A_camera"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 56, 57)",
   "media": "this.panorama_118A5E95_004A_FB5E_414F_25F73E14E9E4",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_118A5E95_004A_FB5E_414F_25F73E14E9E4_camera"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 57, 58)",
   "media": "this.panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_camera"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 58, 59)",
   "media": "this.panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA_camera"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 59, 0)",
   "media": "this.panorama_12B1E6F5_004A_E8DE_4153_B75256AABCDC",
   "end": "this.trigger('tourEnded')",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_12B1E6F5_004A_E8DE_4153_B75256AABCDC_camera"
  }
 ],
 "id": "mainPlayList"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -52.53,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_10104CD0_0618_A612_4155_3093185278B8"
},
{
 "hfov": 360,
 "hfovMin": "150%",
 "class": "Panorama",
 "label": "3bhk bedroom01 23rd",
 "id": "panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2",
 "overlays": [
  "this.overlay_D4424B68_C654_C841_41AA_04E4BDB57422"
 ],
 "pitch": 0,
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2_0/b/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2_0/b/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2_0/b/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2_0/f/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2_0/f/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2_0/f/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2_0/l/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2_0/l/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2_0/u/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2_0/u/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2_0/r/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2_0/r/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2_0/d/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2_0/d/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2_0/d/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "backwardYaw": 33.02,
   "panorama": "this.panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590",
   "yaw": -61.42,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "thumbnailUrl": "media/panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2_t.jpg"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_0EF390FE_019F_1938_4173_7E5BC178F7F6_camera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 97.42,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_10A87D18_0618_A612_4124_E78C4F89CDE0"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -145.26,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_132DFC4D_0618_A672_4193_69D35164A9F7"
},
{
 "hfov": 360,
 "hfovMin": "150%",
 "class": "Panorama",
 "label": "3bhk bedroom03 02 23rd",
 "id": "panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D",
 "overlays": [
  "this.overlay_D25D23DA_C655_D841_41D7_0482A8407978",
  "this.overlay_141820D1_0608_DE13_4184_3BBBDEF95731"
 ],
 "pitch": 0,
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D_0/b/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D_0/b/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D_0/b/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D_0/f/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D_0/f/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D_0/f/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D_0/l/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D_0/l/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D_0/u/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D_0/u/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D_0/r/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D_0/r/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D_0/d/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D_0/d/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D_0/d/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "backwardYaw": 43.8,
   "panorama": "this.panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7",
   "yaw": -54.9,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "backwardYaw": 61.56,
   "panorama": "this.panorama_136FCF41_004A_D936_4151_FFADF2CFBA26",
   "yaw": -94.17,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "thumbnailUrl": "media/panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D_t.jpg"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -91.93,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_11C9CB41_0618_A273_4198_6A96C8140FB8"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 49.25,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_138D3C83_0618_A6F6_418C_0AC25EFA8850"
},
{
 "hfov": 360,
 "hfovMin": "135%",
 "class": "Panorama",
 "label": "3bhk_bedroom01_toilet copy",
 "id": "panorama_118D55D0_004A_E8D6_412B_F15016B43EC0",
 "overlays": [
  "this.overlay_1AF1323F_0049_6B4A_4158_18971B8C0B2E"
 ],
 "pitch": 0,
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_118D55D0_004A_E8D6_412B_F15016B43EC0_0/b/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_118D55D0_004A_E8D6_412B_F15016B43EC0_0/b/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_118D55D0_004A_E8D6_412B_F15016B43EC0_0/b/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_118D55D0_004A_E8D6_412B_F15016B43EC0_0/f/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_118D55D0_004A_E8D6_412B_F15016B43EC0_0/f/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_118D55D0_004A_E8D6_412B_F15016B43EC0_0/f/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_118D55D0_004A_E8D6_412B_F15016B43EC0_0/l/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_118D55D0_004A_E8D6_412B_F15016B43EC0_0/l/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_118D55D0_004A_E8D6_412B_F15016B43EC0_0/u/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_118D55D0_004A_E8D6_412B_F15016B43EC0_0/u/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_118D55D0_004A_E8D6_412B_F15016B43EC0_0/r/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_118D55D0_004A_E8D6_412B_F15016B43EC0_0/r/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_118D55D0_004A_E8D6_412B_F15016B43EC0_0/d/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_118D55D0_004A_E8D6_412B_F15016B43EC0_0/d/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_118D55D0_004A_E8D6_412B_F15016B43EC0_0/d/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_118D55D0_004A_E8D6_412B_F15016B43EC0_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "backwardYaw": -118.24,
   "panorama": "this.panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068",
   "yaw": -3.63,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "thumbnailUrl": "media/panorama_118D55D0_004A_E8D6_412B_F15016B43EC0_t.jpg"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -60.89,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_136E1969_0618_AE32_4197_A06FA44CFFE3"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_C8E097E2_C390_F8A2_419E_45918FB20A48_camera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA_camera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_118B7384_0049_E93E_4136_7E71C475A6E0_camera"
},
{
 "hfov": 360,
 "hfovMin": "150%",
 "class": "Panorama",
 "label": "3bhk bedroom03 01 106th",
 "id": "panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0",
 "overlays": [
  "this.overlay_E54E0653_C654_5847_41E2_4F2F79E153AD",
  "this.overlay_E5F8F5BF_C654_583F_41E0_5A5263ACE886"
 ],
 "pitch": 0,
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_0/b/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_0/b/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_0/b/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_0/f/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_0/f/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_0/f/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_0/l/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_0/l/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_0/u/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_0/u/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_0/r/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_0/r/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_0/d/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_0/d/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_0/d/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "backwardYaw": -49.96,
   "panorama": "this.panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA",
   "yaw": 37.62,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "backwardYaw": 34.3,
   "panorama": "this.panorama_C8E84376_C391_79A5_41A5_D6230668BC5C",
   "yaw": 152.97,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "thumbnailUrl": "media/panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_t.jpg"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_ED9F2470_E6E6_C8FD_41E9_754A21DFFA46_camera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -33.36,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_10F37AB8_0618_A211_4145_6DF534E20CA8"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA_camera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -175.19,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 8.7,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 342.6,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 8.7,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_12ABCBEE_0618_A20E_4177_1168B04D1012"
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
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_C8443AAC_C390_88A6_41E1_B9756BC8A56B_camera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -144.58,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_12888BCD_0618_A272_4192_F613F5DEE84F"
},
{
 "hfov": 360,
 "hfovMin": "150%",
 "class": "Panorama",
 "label": "3bhk bedroom02 2 17th",
 "id": "panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40",
 "overlays": [
  "this.overlay_D06F55C7_C3F0_98E2_41E3_464100BECDC1",
  "this.overlay_09FA2596_0678_A611_4196_27395AC63D08"
 ],
 "pitch": 0,
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40_0/b/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40_0/b/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40_0/b/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40_0/f/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40_0/f/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40_0/f/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40_0/l/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40_0/l/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40_0/u/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40_0/u/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40_0/r/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40_0/r/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40_0/d/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40_0/d/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40_0/d/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "backwardYaw": -130.12,
   "panorama": "this.panorama_0B65F72F_0039_294A_413D_7167CFDDAD60",
   "yaw": 119.11,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "backwardYaw": -21.06,
   "panorama": "this.panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9",
   "yaw": 88.82,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "thumbnailUrl": "media/panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40_t.jpg"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -173.63,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_13E17C74_0618_A612_418C_73B0BCFEC5A5"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -61.89,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 26.51
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 26.51
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 26.51
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_10FA1D00_0618_A7F2_4198_E76972FC0940"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40_camera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -179.24,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_12F38BC5_0618_A272_4198_B65625840429"
},
{
 "hfov": 360,
 "hfovMin": "150%",
 "class": "Panorama",
 "label": "3bhk kitchen",
 "id": "panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA",
 "overlays": [
  "this.overlay_D6BEFA7F_C64C_483F_41C3_9F7466FB8F67"
 ],
 "pitch": 0,
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA_0/b/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA_0/b/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA_0/b/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA_0/f/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA_0/f/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA_0/f/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA_0/l/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA_0/l/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA_0/u/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA_0/u/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA_0/r/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA_0/r/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA_0/d/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA_0/d/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA_0/d/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "backwardYaw": -80.93,
   "panorama": "this.panorama_C8E759F9_C391_88AE_41D0_5C4EF78B7034",
   "yaw": 6.37,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "thumbnailUrl": "media/panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA_t.jpg"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_12B1E6F5_004A_E8DE_4153_B75256AABCDC_camera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -144.55,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_115E8B05_0618_A3F2_4175_27A324C2A047"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -62.9,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_10EACCF8_0618_A611_4197_D27AB8A10F51"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 172.42,
  "pitch": 3.29
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 8.7,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 342.6,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 8.7,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_C8E22910_C38F_897E_41BD_C3761AC35EAF_camera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 34.81,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_13450959_0618_AE12_418C_97AC74D09A89"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -27.03,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_110C9B1E_0618_A20E_4196_728A49A96664"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 48.37,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 11.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 337,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 11.5,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_12F8DBB5_0618_A212_4183_892946718C2A"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 130.04,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_13397990_0618_AE12_415D_71CD813C5740"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 26.51
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 26.51
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 26.51
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9_camera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 176.37,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_11201D82_0618_A6F6_4190_0BF5D69FFABA"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_ED9C7DE8_E6E7_3BEE_41CC_66F6977CF4A0_camera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 55.49,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_11026D62_0618_A631_418E_6F4296582D01"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_camera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4_camera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_11B27642_004A_EB3A_4142_7CBC8EFC0A22_camera"
},
{
 "hfov": 360,
 "hfovMin": "150%",
 "class": "Panorama",
 "label": "3bhk 02 entrance  23rd floor",
 "id": "panorama_C845D458_C38F_7FEE_41AF_209B05ABC3B4",
 "overlays": [
  "this.overlay_CBF6E3D4_C63C_F841_41B1_3D0CA7E88D7D",
  "this.overlay_C86EA64D_C633_D843_41D8_D6B51675C99B",
  "this.overlay_0F5E6C38_0199_0938_416B_1ADD5C4C39E0"
 ],
 "pitch": 0,
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C845D458_C38F_7FEE_41AF_209B05ABC3B4_0/b/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C845D458_C38F_7FEE_41AF_209B05ABC3B4_0/b/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C845D458_C38F_7FEE_41AF_209B05ABC3B4_0/b/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C845D458_C38F_7FEE_41AF_209B05ABC3B4_0/f/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C845D458_C38F_7FEE_41AF_209B05ABC3B4_0/f/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C845D458_C38F_7FEE_41AF_209B05ABC3B4_0/f/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C845D458_C38F_7FEE_41AF_209B05ABC3B4_0/l/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C845D458_C38F_7FEE_41AF_209B05ABC3B4_0/l/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C845D458_C38F_7FEE_41AF_209B05ABC3B4_0/u/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C845D458_C38F_7FEE_41AF_209B05ABC3B4_0/u/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C845D458_C38F_7FEE_41AF_209B05ABC3B4_0/r/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C845D458_C38F_7FEE_41AF_209B05ABC3B4_0/r/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C845D458_C38F_7FEE_41AF_209B05ABC3B4_0/d/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C845D458_C38F_7FEE_41AF_209B05ABC3B4_0/d/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C845D458_C38F_7FEE_41AF_209B05ABC3B4_0/d/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C845D458_C38F_7FEE_41AF_209B05ABC3B4_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "backwardYaw": 37.66,
   "panorama": "this.panorama_C8E759F9_C391_88AE_41D0_5C4EF78B7034",
   "yaw": 5.98,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "backwardYaw": 103.66,
   "panorama": "this.panorama_0EF390FE_019F_1938_4173_7E5BC178F7F6",
   "yaw": -57.26,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "backwardYaw": 146.64,
   "panorama": "this.panorama_C8E03182_C390_F962_41E3_AA944CB11FB1",
   "yaw": 123.01,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "thumbnailUrl": "media/panorama_C845D458_C38F_7FEE_41AF_209B05ABC3B4_t.jpg"
},
{
 "hfov": 360,
 "hfovMin": "135%",
 "class": "Panorama",
 "label": "3bhk_bed2_toilet copy",
 "id": "panorama_0B65F72F_0039_294A_413D_7167CFDDAD60",
 "overlays": [
  "this.overlay_1357338D_0077_294E_4147_F9D08C457157"
 ],
 "pitch": 0,
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0B65F72F_0039_294A_413D_7167CFDDAD60_0/b/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_0B65F72F_0039_294A_413D_7167CFDDAD60_0/b/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0B65F72F_0039_294A_413D_7167CFDDAD60_0/b/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0B65F72F_0039_294A_413D_7167CFDDAD60_0/f/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_0B65F72F_0039_294A_413D_7167CFDDAD60_0/f/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0B65F72F_0039_294A_413D_7167CFDDAD60_0/f/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_0B65F72F_0039_294A_413D_7167CFDDAD60_0/l/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0B65F72F_0039_294A_413D_7167CFDDAD60_0/l/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_0B65F72F_0039_294A_413D_7167CFDDAD60_0/u/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0B65F72F_0039_294A_413D_7167CFDDAD60_0/u/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_0B65F72F_0039_294A_413D_7167CFDDAD60_0/r/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0B65F72F_0039_294A_413D_7167CFDDAD60_0/r/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0B65F72F_0039_294A_413D_7167CFDDAD60_0/d/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_0B65F72F_0039_294A_413D_7167CFDDAD60_0/d/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0B65F72F_0039_294A_413D_7167CFDDAD60_0/d/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_0B65F72F_0039_294A_413D_7167CFDDAD60_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "backwardYaw": 119.11,
   "panorama": "this.panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40",
   "yaw": -130.12,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "thumbnailUrl": "media/panorama_0B65F72F_0039_294A_413D_7167CFDDAD60_t.jpg"
},
{
 "hfov": 360,
 "hfovMin": "135%",
 "class": "Panorama",
 "label": "3BHK_Bolcony _28",
 "id": "panorama_ED4C0B8B_E6E7_5822_41E3_51E3E08986AA",
 "overlays": [
  "this.overlay_F6A783DC_E6E5_4826_41EA_84317254A541"
 ],
 "pitch": 0,
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ED4C0B8B_E6E7_5822_41E3_51E3E08986AA_0/b/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_ED4C0B8B_E6E7_5822_41E3_51E3E08986AA_0/b/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_ED4C0B8B_E6E7_5822_41E3_51E3E08986AA_0/b/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ED4C0B8B_E6E7_5822_41E3_51E3E08986AA_0/f/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_ED4C0B8B_E6E7_5822_41E3_51E3E08986AA_0/f/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_ED4C0B8B_E6E7_5822_41E3_51E3E08986AA_0/f/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "url": "media/panorama_ED4C0B8B_E6E7_5822_41E3_51E3E08986AA_0/l/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_ED4C0B8B_E6E7_5822_41E3_51E3E08986AA_0/l/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_ED4C0B8B_E6E7_5822_41E3_51E3E08986AA_0/l/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "url": "media/panorama_ED4C0B8B_E6E7_5822_41E3_51E3E08986AA_0/u/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_ED4C0B8B_E6E7_5822_41E3_51E3E08986AA_0/u/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_ED4C0B8B_E6E7_5822_41E3_51E3E08986AA_0/u/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "url": "media/panorama_ED4C0B8B_E6E7_5822_41E3_51E3E08986AA_0/r/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_ED4C0B8B_E6E7_5822_41E3_51E3E08986AA_0/r/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_ED4C0B8B_E6E7_5822_41E3_51E3E08986AA_0/r/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ED4C0B8B_E6E7_5822_41E3_51E3E08986AA_0/d/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_ED4C0B8B_E6E7_5822_41E3_51E3E08986AA_0/d/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_ED4C0B8B_E6E7_5822_41E3_51E3E08986AA_0/d/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_ED4C0B8B_E6E7_5822_41E3_51E3E08986AA_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "backwardYaw": -1.88,
   "panorama": "this.panorama_C8E097E2_C390_F8A2_419E_45918FB20A48",
   "yaw": -163.03,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "thumbnailUrl": "media/panorama_ED4C0B8B_E6E7_5822_41E3_51E3E08986AA_t.jpg"
},
{
 "hfov": 360,
 "hfovMin": "150%",
 "class": "Panorama",
 "label": "3bhk Passage 33rd floor",
 "id": "panorama_C8E84376_C391_79A5_41A5_D6230668BC5C",
 "overlays": [
  "this.overlay_D8F8C72D_C654_79C3_41E0_91645FDFE3E3",
  "this.overlay_D9A2C71D_C65C_79C3_41E6_11CD592B17BA",
  "this.overlay_E657F276_C65C_D841_41A5_62C616D8BAE0"
 ],
 "pitch": 0,
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E84376_C391_79A5_41A5_D6230668BC5C_0/b/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E84376_C391_79A5_41A5_D6230668BC5C_0/b/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E84376_C391_79A5_41A5_D6230668BC5C_0/b/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E84376_C391_79A5_41A5_D6230668BC5C_0/f/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E84376_C391_79A5_41A5_D6230668BC5C_0/f/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E84376_C391_79A5_41A5_D6230668BC5C_0/f/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E84376_C391_79A5_41A5_D6230668BC5C_0/l/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E84376_C391_79A5_41A5_D6230668BC5C_0/l/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E84376_C391_79A5_41A5_D6230668BC5C_0/u/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E84376_C391_79A5_41A5_D6230668BC5C_0/u/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E84376_C391_79A5_41A5_D6230668BC5C_0/r/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E84376_C391_79A5_41A5_D6230668BC5C_0/r/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E84376_C391_79A5_41A5_D6230668BC5C_0/d/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E84376_C391_79A5_41A5_D6230668BC5C_0/d/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E84376_C391_79A5_41A5_D6230668BC5C_0/d/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C8E84376_C391_79A5_41A5_D6230668BC5C_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "backwardYaw": 152.97,
   "panorama": "this.panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0",
   "yaw": 34.3,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "backwardYaw": 6.08,
   "panorama": "this.panorama_C8E1F231_C38F_9BBF_41C7_8B73F57AA26D",
   "yaw": -4.73,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "backwardYaw": 6.37,
   "panorama": "this.panorama_E609D5D6_C65C_5841_41DC_4408506ECD34",
   "yaw": -81.21,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "thumbnailUrl": "media/panorama_C8E84376_C391_79A5_41A5_D6230668BC5C_t.jpg"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 124.16,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 8.7,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 342.6,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 8.7,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_1163DD40_0618_A672_4197_C903AAE9E6D2"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_C8E07E20_C390_8B5D_41D7_DBEAC9716594_camera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -43.65,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_10376A6C_0618_A232_417C_BA6727CCE9A5"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 22.46,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_10CCDCE9_0618_A633_4187_D7C7FA169E9F"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_0F2964AA_0199_39D8_415C_DAB75F704D09_camera"
},
{
 "hfov": 360,
 "hfovMin": "135%",
 "class": "Panorama",
 "label": "Powder toilet 3BHK",
 "id": "panorama_0F2964AA_0199_39D8_415C_DAB75F704D09",
 "overlays": [
  "this.overlay_12B3B3CD_01A9_1F58_4175_0448822DFE99"
 ],
 "pitch": 0,
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0F2964AA_0199_39D8_415C_DAB75F704D09_0/b/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_0F2964AA_0199_39D8_415C_DAB75F704D09_0/b/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0F2964AA_0199_39D8_415C_DAB75F704D09_0/b/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0F2964AA_0199_39D8_415C_DAB75F704D09_0/f/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_0F2964AA_0199_39D8_415C_DAB75F704D09_0/f/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0F2964AA_0199_39D8_415C_DAB75F704D09_0/f/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_0F2964AA_0199_39D8_415C_DAB75F704D09_0/l/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0F2964AA_0199_39D8_415C_DAB75F704D09_0/l/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_0F2964AA_0199_39D8_415C_DAB75F704D09_0/u/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0F2964AA_0199_39D8_415C_DAB75F704D09_0/u/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_0F2964AA_0199_39D8_415C_DAB75F704D09_0/r/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0F2964AA_0199_39D8_415C_DAB75F704D09_0/r/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0F2964AA_0199_39D8_415C_DAB75F704D09_0/d/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_0F2964AA_0199_39D8_415C_DAB75F704D09_0/d/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0F2964AA_0199_39D8_415C_DAB75F704D09_0/d/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_0F2964AA_0199_39D8_415C_DAB75F704D09_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "backwardYaw": -55.69,
   "panorama": "this.panorama_C8E1F231_C38F_9BBF_41C7_8B73F57AA26D",
   "yaw": 107.93,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "thumbnailUrl": "media/panorama_0F2964AA_0199_39D8_415C_DAB75F704D09_t.jpg"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 152.65,
  "pitch": -2.47
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_CF1013BA_C391_98A2_4167_0505D502E364_camera"
},
{
 "hfov": 360,
 "hfovMin": "135%",
 "class": "Panorama",
 "label": "3bhk_bed2_toilet copy",
 "id": "panorama_118A5E95_004A_FB5E_414F_25F73E14E9E4",
 "overlays": [
  "this.overlay_1BA8B30A_004F_694A_4158_016311CE43BA"
 ],
 "pitch": 0,
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_118A5E95_004A_FB5E_414F_25F73E14E9E4_0/b/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_118A5E95_004A_FB5E_414F_25F73E14E9E4_0/b/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_118A5E95_004A_FB5E_414F_25F73E14E9E4_0/b/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_118A5E95_004A_FB5E_414F_25F73E14E9E4_0/f/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_118A5E95_004A_FB5E_414F_25F73E14E9E4_0/f/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_118A5E95_004A_FB5E_414F_25F73E14E9E4_0/f/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_118A5E95_004A_FB5E_414F_25F73E14E9E4_0/l/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_118A5E95_004A_FB5E_414F_25F73E14E9E4_0/l/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_118A5E95_004A_FB5E_414F_25F73E14E9E4_0/u/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_118A5E95_004A_FB5E_414F_25F73E14E9E4_0/u/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_118A5E95_004A_FB5E_414F_25F73E14E9E4_0/r/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_118A5E95_004A_FB5E_414F_25F73E14E9E4_0/r/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_118A5E95_004A_FB5E_414F_25F73E14E9E4_0/d/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_118A5E95_004A_FB5E_414F_25F73E14E9E4_0/d/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_118A5E95_004A_FB5E_414F_25F73E14E9E4_0/d/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_118A5E95_004A_FB5E_414F_25F73E14E9E4_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "backwardYaw": 117.73,
   "panorama": "this.panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A",
   "yaw": -131.63,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "thumbnailUrl": "media/panorama_118A5E95_004A_FB5E_414F_25F73E14E9E4_t.jpg"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 86.08,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_11726D55_0618_A613_4176_A06FF80AF8F2"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -135.72,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_134B6C05_0618_A5F2_4194_CC6D49DA2647"
},
{
 "hfov": 360,
 "hfovMin": "135%",
 "class": "Panorama",
 "label": "3BHK_Bolcony_23",
 "id": "panorama_ED9C7DE8_E6E7_3BEE_41CC_66F6977CF4A0",
 "overlays": [
  "this.overlay_F6E05386_E6EA_C822_41E5_EE608AF52782"
 ],
 "pitch": 0,
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ED9C7DE8_E6E7_3BEE_41CC_66F6977CF4A0_0/b/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_ED9C7DE8_E6E7_3BEE_41CC_66F6977CF4A0_0/b/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_ED9C7DE8_E6E7_3BEE_41CC_66F6977CF4A0_0/b/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ED9C7DE8_E6E7_3BEE_41CC_66F6977CF4A0_0/f/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_ED9C7DE8_E6E7_3BEE_41CC_66F6977CF4A0_0/f/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_ED9C7DE8_E6E7_3BEE_41CC_66F6977CF4A0_0/f/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "url": "media/panorama_ED9C7DE8_E6E7_3BEE_41CC_66F6977CF4A0_0/l/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_ED9C7DE8_E6E7_3BEE_41CC_66F6977CF4A0_0/l/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_ED9C7DE8_E6E7_3BEE_41CC_66F6977CF4A0_0/l/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "url": "media/panorama_ED9C7DE8_E6E7_3BEE_41CC_66F6977CF4A0_0/u/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_ED9C7DE8_E6E7_3BEE_41CC_66F6977CF4A0_0/u/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_ED9C7DE8_E6E7_3BEE_41CC_66F6977CF4A0_0/u/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "url": "media/panorama_ED9C7DE8_E6E7_3BEE_41CC_66F6977CF4A0_0/r/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_ED9C7DE8_E6E7_3BEE_41CC_66F6977CF4A0_0/r/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_ED9C7DE8_E6E7_3BEE_41CC_66F6977CF4A0_0/r/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ED9C7DE8_E6E7_3BEE_41CC_66F6977CF4A0_0/d/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_ED9C7DE8_E6E7_3BEE_41CC_66F6977CF4A0_0/d/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_ED9C7DE8_E6E7_3BEE_41CC_66F6977CF4A0_0/d/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_ED9C7DE8_E6E7_3BEE_41CC_66F6977CF4A0_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "backwardYaw": -0.12,
   "panorama": "this.panorama_C8E03182_C390_F962_41E3_AA944CB11FB1",
   "yaw": -169.32,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "thumbnailUrl": "media/panorama_ED9C7DE8_E6E7_3BEE_41CC_66F6977CF4A0_t.jpg"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 125.1,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_10B0AAF4_0618_A212_416F_723651DE2067"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 111.03,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_1110CD75_0618_A612_4190_A8D19B6CEA18"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 174.48,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_104F89E0_0618_AE32_4180_E92F3AF7AEB0"
},
{
 "hfov": 360,
 "hfovMin": "150%",
 "class": "Panorama",
 "label": "3bhk kitchen",
 "id": "panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9",
 "overlays": [
  "this.overlay_DE130192_C67C_38C1_41C4_0A4C5ECF7BB5"
 ],
 "pitch": 0,
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9_0/b/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9_0/b/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9_0/b/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9_0/f/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9_0/f/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9_0/f/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9_0/l/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9_0/l/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9_0/u/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9_0/u/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9_0/r/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9_0/r/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9_0/d/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9_0/d/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9_0/d/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "backwardYaw": -77.5,
   "panorama": "this.panorama_C8E8EEF1_C391_88BE_41E1_593F441770DA",
   "yaw": 5.82,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "thumbnailUrl": "media/panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9_t.jpg"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_C8E759F9_C391_88AE_41D0_5C4EF78B7034_camera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 34.68,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_103E5CE1_0618_A633_417C_6EA64984716B"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 168.3,
  "pitch": 4.12
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_C8E21D8B_C38F_8962_41E8_4ED88E72A8E4_camera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 123.49,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_135FEC16_0618_A611_4169_4CB18DD19580"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -120.08,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_13118C45_0618_A672_4159_60D6D0368B1D"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -26.77,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_10920AD8_0618_A211_416D_A02629EA042C"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 154.25,
  "pitch": 6.53
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_135DA583_0049_293A_414E_3C25985D46CB_camera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 102.5,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_10455CAA_0618_A636_4153_F11200E7C35D"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -136.2,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_130BCC36_0618_A611_4155_1940D351918F"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_0DDD37F8_019B_0738_4165_2278D9DB7F90_camera"
},
{
 "hfov": 360,
 "hfovMin": "150%",
 "class": "Panorama",
 "label": "3bhk Passage 17th floor",
 "id": "panorama_C857B562_C391_99A2_41D4_622CFBF52C0A",
 "overlays": [
  "this.overlay_D2F533D4_C3F3_98E5_41DC_C06241682CEA",
  "this.overlay_D20E5953_C3F1_89E3_41E2_DE390783024A",
  "this.overlay_D181A890_C3F0_977D_41E6_810868AFA24B"
 ],
 "pitch": 0,
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_0/b/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_0/b/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_0/b/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_0/f/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_0/f/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_0/f/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_0/l/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_0/l/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_0/u/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_0/u/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_0/r/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_0/r/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_0/d/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_0/d/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_0/d/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "backwardYaw": 4.81,
   "panorama": "this.panorama_C8E22910_C38F_897E_41BD_C3761AC35EAF",
   "yaw": -5.35,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "backwardYaw": 153.25,
   "panorama": "this.panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A",
   "yaw": 35.46,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "backwardYaw": 4.72,
   "panorama": "this.panorama_CF1013BA_C391_98A2_4167_0505D502E364",
   "yaw": -82.58,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "thumbnailUrl": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_t.jpg"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_camera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 86.45,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_1062CCBA_0618_A611_415B_146402955132"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 175.27,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_12E84B9B_0618_A216_4166_A5AB7FA6514C"
},
{
 "hfov": 360,
 "hfovMin": "150%",
 "class": "Panorama",
 "label": "3bhk 02 entrance 17th floor",
 "id": "panorama_C8E22910_C38F_897E_41BD_C3761AC35EAF",
 "overlays": [
  "this.overlay_CC924D89_C3F3_896E_41E4_09D608EE2A76",
  "this.overlay_CC66AADF_C3F0_88E3_41D2_C7310A6919B1",
  "this.overlay_0C2B3182_0199_7BC8_4166_8FB5F8F2C9AF"
 ],
 "pitch": 0,
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E22910_C38F_897E_41BD_C3761AC35EAF_0/b/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E22910_C38F_897E_41BD_C3761AC35EAF_0/b/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E22910_C38F_897E_41BD_C3761AC35EAF_0/b/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E22910_C38F_897E_41BD_C3761AC35EAF_0/f/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E22910_C38F_897E_41BD_C3761AC35EAF_0/f/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E22910_C38F_897E_41BD_C3761AC35EAF_0/f/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E22910_C38F_897E_41BD_C3761AC35EAF_0/l/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E22910_C38F_897E_41BD_C3761AC35EAF_0/l/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E22910_C38F_897E_41BD_C3761AC35EAF_0/u/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E22910_C38F_897E_41BD_C3761AC35EAF_0/u/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E22910_C38F_897E_41BD_C3761AC35EAF_0/r/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E22910_C38F_897E_41BD_C3761AC35EAF_0/r/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E22910_C38F_897E_41BD_C3761AC35EAF_0/d/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E22910_C38F_897E_41BD_C3761AC35EAF_0/d/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E22910_C38F_897E_41BD_C3761AC35EAF_0/d/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C8E22910_C38F_897E_41BD_C3761AC35EAF_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "backwardYaw": 103.26,
   "panorama": "this.panorama_0DDD37F8_019B_0738_4165_2278D9DB7F90",
   "yaw": -55.84,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "backwardYaw": 144.86,
   "panorama": "this.panorama_C8443AAC_C390_88A6_41E1_B9756BC8A56B",
   "yaw": 125.82,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "backwardYaw": -5.35,
   "panorama": "this.panorama_C857B562_C391_99A2_41D4_622CFBF52C0A",
   "yaw": 4.81,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "thumbnailUrl": "media/panorama_C8E22910_C38F_897E_41BD_C3761AC35EAF_t.jpg"
},
{
 "hfov": 360,
 "hfovMin": "150%",
 "class": "Panorama",
 "label": "3bhk bedroom02 1 17th",
 "id": "panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9",
 "overlays": [
  "this.overlay_D0840BD8_C3F0_88ED_41D5_401F4C1D0F9A",
  "this.overlay_D0C5DA7D_C3F1_8BA7_41D0_40EE562498C3"
 ],
 "pitch": 0,
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_0/b/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_0/b/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_0/b/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_0/f/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_0/f/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_0/f/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_0/l/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_0/l/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_0/u/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_0/u/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_0/r/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_0/r/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_0/d/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_0/d/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_0/d/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "backwardYaw": 135.92,
   "panorama": "this.panorama_C8443AAC_C390_88A6_41E1_B9756BC8A56B",
   "yaw": -146.66,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "backwardYaw": 88.82,
   "panorama": "this.panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40",
   "yaw": -21.06,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "thumbnailUrl": "media/panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_t.jpg"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 158.25,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_13385C55_0618_A612_417F_CB7D97E03879"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -175.28,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_12BF8BFE_0618_A20E_4195_759912B84402"
},
{
 "hfov": 360,
 "hfovMin": "135%",
 "class": "Panorama",
 "label": "3BHK_Bolcony_17",
 "id": "panorama_ED86F742_E6E7_4822_41BC_D0EBB6B298F9",
 "overlays": [
  "this.overlay_E931FF5C_E6ED_D826_41E1_CA0864D785E1"
 ],
 "pitch": 0,
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ED86F742_E6E7_4822_41BC_D0EBB6B298F9_0/b/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_ED86F742_E6E7_4822_41BC_D0EBB6B298F9_0/b/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_ED86F742_E6E7_4822_41BC_D0EBB6B298F9_0/b/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ED86F742_E6E7_4822_41BC_D0EBB6B298F9_0/f/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_ED86F742_E6E7_4822_41BC_D0EBB6B298F9_0/f/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_ED86F742_E6E7_4822_41BC_D0EBB6B298F9_0/f/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "url": "media/panorama_ED86F742_E6E7_4822_41BC_D0EBB6B298F9_0/l/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_ED86F742_E6E7_4822_41BC_D0EBB6B298F9_0/l/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_ED86F742_E6E7_4822_41BC_D0EBB6B298F9_0/l/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "url": "media/panorama_ED86F742_E6E7_4822_41BC_D0EBB6B298F9_0/u/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_ED86F742_E6E7_4822_41BC_D0EBB6B298F9_0/u/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_ED86F742_E6E7_4822_41BC_D0EBB6B298F9_0/u/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "url": "media/panorama_ED86F742_E6E7_4822_41BC_D0EBB6B298F9_0/r/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_ED86F742_E6E7_4822_41BC_D0EBB6B298F9_0/r/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_ED86F742_E6E7_4822_41BC_D0EBB6B298F9_0/r/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ED86F742_E6E7_4822_41BC_D0EBB6B298F9_0/d/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_ED86F742_E6E7_4822_41BC_D0EBB6B298F9_0/d/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_ED86F742_E6E7_4822_41BC_D0EBB6B298F9_0/d/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_ED86F742_E6E7_4822_41BC_D0EBB6B298F9_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "backwardYaw": -0.24,
   "panorama": "this.panorama_C8443AAC_C390_88A6_41E1_B9756BC8A56B",
   "yaw": -171.32,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "thumbnailUrl": "media/panorama_ED86F742_E6E7_4822_41BC_D0EBB6B298F9_t.jpg"
},
{
 "hfov": 360,
 "hfovMin": "150%",
 "class": "Panorama",
 "label": "3bhk Passage 23rd floor",
 "id": "panorama_C8E759F9_C391_88AE_41D0_5C4EF78B7034",
 "overlays": [
  "this.overlay_D6A133C2_C634_D841_41E3_3F1875A05CAD",
  "this.overlay_D78B856A_C635_D841_41D8_38F24CF45E90",
  "this.overlay_D6DCC2CE_C634_F841_41DB_C74AF57B3D08"
 ],
 "pitch": 0,
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E759F9_C391_88AE_41D0_5C4EF78B7034_0/b/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E759F9_C391_88AE_41D0_5C4EF78B7034_0/b/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E759F9_C391_88AE_41D0_5C4EF78B7034_0/b/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E759F9_C391_88AE_41D0_5C4EF78B7034_0/f/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E759F9_C391_88AE_41D0_5C4EF78B7034_0/f/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E759F9_C391_88AE_41D0_5C4EF78B7034_0/f/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E759F9_C391_88AE_41D0_5C4EF78B7034_0/l/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E759F9_C391_88AE_41D0_5C4EF78B7034_0/l/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E759F9_C391_88AE_41D0_5C4EF78B7034_0/u/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E759F9_C391_88AE_41D0_5C4EF78B7034_0/u/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E759F9_C391_88AE_41D0_5C4EF78B7034_0/r/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E759F9_C391_88AE_41D0_5C4EF78B7034_0/r/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E759F9_C391_88AE_41D0_5C4EF78B7034_0/d/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E759F9_C391_88AE_41D0_5C4EF78B7034_0/d/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E759F9_C391_88AE_41D0_5C4EF78B7034_0/d/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C8E759F9_C391_88AE_41D0_5C4EF78B7034_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "backwardYaw": 5.98,
   "panorama": "this.panorama_C845D458_C38F_7FEE_41AF_209B05ABC3B4",
   "yaw": 37.66,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "backwardYaw": 5.98,
   "panorama": "this.panorama_C845D458_C38F_7FEE_41AF_209B05ABC3B4",
   "yaw": -4.32,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "backwardYaw": 6.37,
   "panorama": "this.panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA",
   "yaw": -80.93,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "thumbnailUrl": "media/panorama_C8E759F9_C391_88AE_41D0_5C4EF78B7034_t.jpg"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -173.06,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_1369DC1E_0618_A611_4196_78EFF06637A5"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D_camera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9_camera"
},
{
 "hfov": 360,
 "hfovMin": "150%",
 "class": "Panorama",
 "label": "3bhk 02 entrance 33rd floor",
 "id": "panorama_C8E1F231_C38F_9BBF_41C7_8B73F57AA26D",
 "overlays": [
  "this.overlay_DDAC91FB_C64C_3847_41DE_4E8AC2FC381D",
  "this.overlay_DA2CFE08_C64C_4BC1_41C2_4C4C28E16DA7",
  "this.overlay_13150BDB_01A7_0F78_4176_E70CD73338D4"
 ],
 "pitch": 0,
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E1F231_C38F_9BBF_41C7_8B73F57AA26D_0/b/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E1F231_C38F_9BBF_41C7_8B73F57AA26D_0/b/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E1F231_C38F_9BBF_41C7_8B73F57AA26D_0/b/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E1F231_C38F_9BBF_41C7_8B73F57AA26D_0/f/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E1F231_C38F_9BBF_41C7_8B73F57AA26D_0/f/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E1F231_C38F_9BBF_41C7_8B73F57AA26D_0/f/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E1F231_C38F_9BBF_41C7_8B73F57AA26D_0/l/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E1F231_C38F_9BBF_41C7_8B73F57AA26D_0/l/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E1F231_C38F_9BBF_41C7_8B73F57AA26D_0/u/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E1F231_C38F_9BBF_41C7_8B73F57AA26D_0/u/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E1F231_C38F_9BBF_41C7_8B73F57AA26D_0/r/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E1F231_C38F_9BBF_41C7_8B73F57AA26D_0/r/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E1F231_C38F_9BBF_41C7_8B73F57AA26D_0/d/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E1F231_C38F_9BBF_41C7_8B73F57AA26D_0/d/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E1F231_C38F_9BBF_41C7_8B73F57AA26D_0/d/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C8E1F231_C38F_9BBF_41C7_8B73F57AA26D_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "backwardYaw": 107.93,
   "panorama": "this.panorama_0F2964AA_0199_39D8_415C_DAB75F704D09",
   "yaw": -55.69,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "backwardYaw": 144.86,
   "panorama": "this.panorama_C8E07E20_C390_8B5D_41D7_DBEAC9716594",
   "yaw": 127.47,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "backwardYaw": -4.73,
   "panorama": "this.panorama_C8E84376_C391_79A5_41A5_D6230668BC5C",
   "yaw": 6.08,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "thumbnailUrl": "media/panorama_C8E1F231_C38F_9BBF_41C7_8B73F57AA26D_t.jpg"
},
{
 "hfov": 360,
 "hfovMin": "150%",
 "class": "Panorama",
 "label": "3bhk bedroom02 1 23rd",
 "id": "panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9",
 "overlays": [
  "this.overlay_D55AF350_C65C_5841_41E8_2583A752FBE8",
  "this.overlay_1788E5E3_0609_A636_4170_98106BB92308"
 ],
 "pitch": 0,
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9_0/b/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9_0/b/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9_0/b/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9_0/f/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9_0/f/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9_0/f/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9_0/l/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9_0/l/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9_0/u/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9_0/u/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9_0/r/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9_0/r/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9_0/d/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9_0/d/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9_0/d/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "backwardYaw": -20.79,
   "panorama": "this.panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5",
   "yaw": 75.99,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "backwardYaw": -130.75,
   "panorama": "this.panorama_11B27642_004A_EB3A_4142_7CBC8EFC0A22",
   "yaw": 118.11,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "thumbnailUrl": "media/panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9_t.jpg"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 175.27,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 340.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 9.75,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_10A0FAEA_0618_A236_4175_65A5A838C9BB"
},
{
 "hfov": 360,
 "hfovMin": "150%",
 "class": "Panorama",
 "label": "3bhk bedroom02 1 33rd",
 "id": "panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A",
 "overlays": [
  "this.overlay_E483FB4F_C654_C85F_41D6_EB69928269D3",
  "this.overlay_15B8B6A2_0608_E231_4196_4E1A0E5B8274"
 ],
 "pitch": 0,
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A_0/b/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A_0/b/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A_0/b/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A_0/f/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A_0/f/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A_0/f/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A_0/l/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A_0/l/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A_0/u/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A_0/u/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
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
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A_0/r/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A_0/r/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A_0/d/0/{row}_{column}.jpg",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A_0/d/1/{row}_{column}.jpg",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A_0/d/2/{row}_{column}.jpg",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "backwardYaw": -131.63,
   "panorama": "this.panorama_118A5E95_004A_FB5E_414F_25F73E14E9E4",
   "yaw": 117.73,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40"
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "partial": false,
 "thumbnailUrl": "media/panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A_t.jpg"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -74.2,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_1082BACA_0618_A271_4161_8027F0A06462"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -76.74,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 13.26
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_13AA6C93_0618_A616_4192_BF5EC3A4E353"
},
{
 "progressBorderRadius": 0,
 "toolTipPaddingRight": 6,
 "id": "MainViewer",
 "width": "100%",
 "paddingBottom": 0,
 "toolTipPaddingTop": 4,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "borderRadius": 0,
 "toolTipDisplayTime": 600,
 "toolTipPaddingLeft": 6,
 "playbackBarHeadShadowBlurRadius": 3,
 "playbackBarLeft": 0,
 "progressBackgroundColorRatios": [
  0
 ],
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "toolTipBorderRadius": 3,
 "playbackBarHeadShadowVerticalLength": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "playbackBarHeadHeight": 15,
 "minHeight": 50,
 "playbackBarBottom": 5,
 "progressBarBorderColor": "#000000",
 "progressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "toolTipShadowSpread": 0,
 "playbackBarHeadOpacity": 1,
 "progressBorderColor": "#000000",
 "toolTipBorderColor": "#767676",
 "displayTooltipInTouchScreens": true,
 "minWidth": 100,
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "class": "ViewerArea",
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "toolTipOpacity": 1,
 "height": "100%",
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
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarRight": 0,
 "paddingTop": 0,
 "playbackBarProgressBorderSize": 0,
 "toolTipPaddingBottom": 4,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "toolTipFontWeight": "normal",
 "shadow": false,
 "progressBarBorderSize": 0,
 "playbackBarBorderRadius": 0,
 "transitionDuration": 500,
 "toolTipShadowColor": "#333333",
 "playbackBarHeadBorderRadius": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
 "playbackBarProgressBorderColor": "#000000",
 "toolTipShadowOpacity": 1,
 "toolTipFontStyle": "normal",
 "progressLeft": 0,
 "playbackBarHeadBorderColor": "#000000",
 "playbackBarHeadBorderSize": 0,
 "paddingRight": 0,
 "playbackBarBorderSize": 0,
 "toolTipShadowHorizontalLength": 0,
 "playbackBarProgressOpacity": 1,
 "propagateClick": false,
 "playbackBarBackgroundOpacity": 1,
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "toolTipShadowVerticalLength": 0,
 "transitionMode": "blending",
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 0,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "data": {
  "name": "Main Viewer"
 },
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "toolTipBorderSize": 1
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C8E8EEF1_C391_88BE_41E1_593F441770DA, this.camera_115E8B05_0618_A3F2_4175_27A324C2A047); this.mainPlayList.set('selectedIndex', 34)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 151.46,
   "hfov": 16.56,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_1_HS_0_0_0_map.gif",
      "width": 16,
      "height": 17
     }
    ]
   },
   "pitch": 5.63
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "yaw": 151.46,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_1_HS_0_0.png",
      "width": 231,
      "height": 246
     }
    ]
   },
   "pitch": 5.63,
   "hfov": 16.56
  }
 ],
 "id": "overlay_DC0C8682_C673_D8C1_41C9_3F738D8FB7A5",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6, this.camera_114F5AFD_0618_A212_418C_219FAB61ED50); this.mainPlayList.set('selectedIndex', 43)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 34.74,
   "hfov": 16.59,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_1_HS_1_0_0_map.gif",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -31.4
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_EE9BB528_C634_79C1_41B3_1F353BE8FDD6",
   "yaw": 34.74,
   "pitch": -31.4,
   "distance": 100,
   "hfov": 16.59
  }
 ],
 "id": "overlay_DC8E5D89_C64C_48C3_41D0_5E147F703183",
 "data": {
  "label": "Circle 01a"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068, this.camera_12800BD5_0618_A212_418C_7BD3DBF49293); this.mainPlayList.set('selectedIndex', 51)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -68.97,
   "hfov": 11.47,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D_1_HS_0_0_0_map.gif",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -37.71
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_EE861538_C634_79C1_41E5_D5BEC86A2DD1",
   "yaw": -68.97,
   "pitch": -37.71,
   "distance": 100,
   "hfov": 11.47
  }
 ],
 "id": "overlay_E7E37E24_C654_4BC2_41E1_8DC9EEC30B49",
 "data": {
  "label": "Circle 01a"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0, this.camera_13385C55_0618_A612_417F_CB7D97E03879); this.mainPlayList.set('selectedIndex', 39)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 88.07,
   "hfov": 11.55,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5_1_HS_0_0_0_map.gif",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -53.53
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_EE9AE527_C634_79CF_41CB_542FF5E39B28",
   "yaw": 88.07,
   "pitch": -53.53,
   "distance": 100,
   "hfov": 11.55
  }
 ],
 "id": "overlay_DFA742CC_C674_3841_419D_AB7849550207",
 "data": {
  "label": "Circle 01a"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_11906CBC_0049_DF4E_411B_4127E5D5F480, this.camera_13362C5D_0618_A612_4187_C9C3CD70828C); this.mainPlayList.set('selectedIndex', 41)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 117.1,
   "hfov": 10.87,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5_0_HS_2_0_0_map.gif",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -0.18
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "yaw": 117.1,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5_0_HS_2_0.png",
      "width": 151,
      "height": 151
     }
    ]
   },
   "pitch": -0.18,
   "hfov": 10.87
  }
 ],
 "id": "overlay_14AA83F7_0608_A21E_4189_B52BDB95135B",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D, this.camera_13E419AF_0618_AE0E_4148_BBE4449EEC26); this.mainPlayList.set('selectedIndex', 28)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 61.56,
   "hfov": 13.83,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_136FCF41_004A_D936_4151_FFADF2CFBA26_1_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 1.19
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "yaw": 61.56,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_136FCF41_004A_D936_4151_FFADF2CFBA26_1_HS_0_0.png",
      "width": 230,
      "height": 238
     }
    ]
   },
   "pitch": 1.19,
   "hfov": 13.83
  }
 ],
 "id": "overlay_163A1A6F_005F_DBCA_4143_609D9385BACF",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C8443AAC_C390_88A6_41E1_B9756BC8A56B, this.camera_10396A59_0618_A212_4194_EADE1FA43266); this.mainPlayList.set('selectedIndex', 1)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -158.37,
   "hfov": 10.85,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_1_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 3.3
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "yaw": -158.37,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_1_HS_0_0.png",
      "width": 150,
      "height": 150
     }
    ]
   },
   "pitch": 3.3,
   "hfov": 10.85
  }
 ],
 "id": "overlay_D0FEC682_C3F1_BB62_41D4_9102F3B6D6C5",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23, this.camera_10199A34_0618_A212_4197_15010B667665); this.mainPlayList.set('selectedIndex', 7)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 35.42,
   "hfov": 12.93,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_1_HS_1_0_0_map.gif",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -36.82
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_EE96A517_C634_79CF_41BB_38AC08D7DC61",
   "yaw": 35.42,
   "pitch": -36.82,
   "distance": 100,
   "hfov": 12.93
  }
 ],
 "id": "overlay_D09F0370_C3F0_99BE_41E4_9F144A073A5D",
 "data": {
  "label": "Circle 01a"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_0B55BDE4_0039_38FE_4139_E851DEBF7C58, this.camera_10293A47_0618_A27E_4158_B2D334F7D5DE); this.mainPlayList.set('selectedIndex', 8)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -120.13,
   "hfov": 14.23,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_1_HS_2_0_0_map.gif",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": 1.6
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "yaw": -120.13,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_1_HS_2_0.png",
      "width": 197,
      "height": 110
     }
    ]
   },
   "pitch": 1.6,
   "hfov": 14.23
  }
 ],
 "id": "overlay_110BAFB3_0059_F95A_4127_54DF609932E8",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C8E07E20_C390_8B5D_41D7_DBEAC9716594, this.camera_11026D62_0618_A631_418E_6F4296582D01); this.mainPlayList.set('selectedIndex', 46)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -157.54,
   "hfov": 18.01,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_1_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 1.24
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "yaw": -157.54,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_1_HS_0_0.png",
      "width": 250,
      "height": 261
     }
    ]
   },
   "pitch": 1.24,
   "hfov": 18.01
  }
 ],
 "id": "overlay_E6C34BC9_C65D_C843_41E3_37D707F31C56",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D, this.camera_1110CD75_0618_A612_4190_A8D19B6CEA18); this.mainPlayList.set('selectedIndex', 52)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 37.55,
   "hfov": 15.24,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_1_HS_1_0_0_map.gif",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -38.4
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_EE868537_C634_79CF_41DE_C101E360270A",
   "yaw": 37.55,
   "pitch": -38.4,
   "distance": 100,
   "hfov": 15.24
  }
 ],
 "id": "overlay_E7577260_C65C_7843_41E0_F5DDAEA8A5BD",
 "data": {
  "label": "Circle 01a"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_118D55D0_004A_E8D6_412B_F15016B43EC0, this.camera_11201D82_0618_A6F6_4190_0BF5D69FFABA); this.mainPlayList.set('selectedIndex', 53)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -118.24,
   "hfov": 13.98,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_1_HS_2_0_0_map.gif",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -0.66
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "yaw": -118.24,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_1_HS_2_0.png",
      "width": 194,
      "height": 194
     }
    ]
   },
   "pitch": -0.66,
   "hfov": 13.98
  }
 ],
 "id": "overlay_19DDB770_0049_29D6_4144_6CAA6C7E4DF0",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C8E097E2_C390_F8A2_419E_45918FB20A48, this.camera_116EBB0E_0618_A3F1_4171_0EC4CC376292); this.mainPlayList.set('selectedIndex', 31)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -158.16,
   "hfov": 10.87,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_1_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 1.24
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "yaw": -158.16,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_1_HS_0_0.png",
      "width": 150,
      "height": 150
     }
    ]
   },
   "pitch": 1.24,
   "hfov": 10.87
  }
 ],
 "id": "overlay_DE78BD94_C67C_48C1_41E0_19E3E3F56405",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5, this.camera_117D4B16_0618_A21E_4198_36AA6C824EDD); this.mainPlayList.set('selectedIndex', 37)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 39.47,
   "hfov": 15.63,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_1_HS_1_0_0_map.gif",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -36.48
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_EE9C0525_C634_79C3_41E5_176E60E12F40",
   "yaw": 39.47,
   "pitch": -36.48,
   "distance": 100,
   "hfov": 15.63
  }
 ],
 "id": "overlay_DEFD2A97_C674_C8CF_41E4_A52F962F63C7",
 "data": {
  "label": "Circle 01a"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 38)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -119.12,
   "hfov": 14.22,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_1_HS_2_0_0_map.gif",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": 2.23
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "yaw": -119.12,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_1_HS_2_0.png",
      "width": 197,
      "height": 177
     }
    ]
   },
   "pitch": 2.23,
   "hfov": 14.22
  }
 ],
 "id": "overlay_168A7BD6_0059_58DD_414D_A29E2A615EAE",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068, this.camera_10CCDCE9_0618_A633_4187_D7C7FA169E9F); this.mainPlayList.set('selectedIndex', 51)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -124.51,
   "hfov": 12.77,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C8E07E20_C390_8B5D_41D7_DBEAC9716594_1_HS_0_0_0_map.gif",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": 0.84
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "yaw": -124.51,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C8E07E20_C390_8B5D_41D7_DBEAC9716594_1_HS_0_0.png",
      "width": 212,
      "height": 199
     }
    ]
   },
   "pitch": 0.84,
   "hfov": 12.77
  }
 ],
 "id": "overlay_DAD97D83_C654_48C7_41B7_5C3CD58749B6",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C8E1F231_C38F_9BBF_41C7_8B73F57AA26D, this.camera_10104CD0_0618_A612_4155_3093185278B8); this.mainPlayList.set('selectedIndex', 45)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 144.86,
   "hfov": 16.18,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C8E07E20_C390_8B5D_41D7_DBEAC9716594_1_HS_1_0_0_map.gif",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -29.15
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_EE99E532_C634_79C1_41D6_1B017FB56B5D",
   "yaw": 144.86,
   "pitch": -29.15,
   "distance": 100,
   "hfov": 16.18
  }
 ],
 "id": "overlay_DB45F6D9_C654_3843_41E0_655C9315E778",
 "data": {
  "label": "Circle 01a"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A, this.camera_103E5CE1_0618_A633_417C_6EA64984716B); this.mainPlayList.set('selectedIndex', 54)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 136.35,
   "hfov": 8.35,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C8E07E20_C390_8B5D_41D7_DBEAC9716594_1_HS_2_0_0_map.gif",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 4
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_EE98B533_C634_79C7_41CE_E8F5D45B1A6B",
   "yaw": 136.35,
   "pitch": 4,
   "distance": 50,
   "hfov": 8.35
  }
 ],
 "id": "overlay_DBC73BCC_C654_4841_41C6_2F8A5000FCD7",
 "data": {
  "label": "Arrow 01 Left"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ED9F2470_E6E6_C8FD_41E9_754A21DFFA46, this.camera_102E5CD8_0618_A612_4181_B254E4861B73); this.mainPlayList.set('selectedIndex', 47)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0.76,
   "hfov": 13.8,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C8E07E20_C390_8B5D_41D7_DBEAC9716594_1_HS_3_0_0_map.gif",
      "width": 19,
      "height": 16
     }
    ]
   },
   "pitch": 4.2
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "yaw": 0.76,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C8E07E20_C390_8B5D_41D7_DBEAC9716594_1_HS_3_0.png",
      "width": 230,
      "height": 188
     }
    ]
   },
   "pitch": 4.2,
   "hfov": 13.8
  }
 ],
 "id": "overlay_F7D8DDC3_E6E6_D823_41EB_93AB600F6632",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B, this.camera_132DFC4D_0618_A672_4193_69D35164A9F7); this.mainPlayList.set('selectedIndex', 42)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -49.75,
   "hfov": 16.22,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6_1_HS_0_0_0_map.gif",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -33.46
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_EE9B3529_C634_79C3_41E2_6373077866CD",
   "yaw": -49.75,
   "pitch": -33.46,
   "distance": 100,
   "hfov": 16.22
  }
 ],
 "id": "overlay_DDE3106F_C64C_D85F_41C3_782CF613010E",
 "data": {
  "label": "Circle 01a"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_135DA583_0049_293A_414E_3C25985D46CB, this.camera_13118C45_0618_A672_4159_60D6D0368B1D); this.mainPlayList.set('selectedIndex', 44)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -93.92,
   "hfov": 10.37,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6_0_HS_2_0_0_map.gif",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -0.85
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "yaw": -93.92,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6_0_HS_2_0.png",
      "width": 144,
      "height": 144
     }
    ]
   },
   "pitch": -0.85,
   "hfov": 10.37
  }
 ],
 "id": "overlay_15CEF500_0608_67F2_415C_6AB7E6A6DB80",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C8E03182_C390_F962_41E3_AA944CB11FB1, this.camera_105DB9E8_0618_AE32_418C_2BABC28F2C52); this.mainPlayList.set('selectedIndex', 16)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -157.27,
   "hfov": 10.83,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_1_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 4.95
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "yaw": -157.27,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_1_HS_0_0.png",
      "width": 150,
      "height": 150
     }
    ]
   },
   "pitch": 4.95,
   "hfov": 10.83
  }
 ],
 "id": "overlay_D7E43C95_C654_48C3_41D5_D441E8F4B5BE",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2, this.camera_13B079D8_0618_AE12_4190_6D399792F34D); this.mainPlayList.set('selectedIndex', 22)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 33.02,
   "hfov": 11.91,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_1_HS_1_0_0_map.gif",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -34.76
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_EE92B51D_C634_79C3_41E6_BF230F987FF4",
   "yaw": 33.02,
   "pitch": -34.76,
   "distance": 100,
   "hfov": 11.91
  }
 ],
 "id": "overlay_D78C34B1_C654_58C3_41C3_A038E40060B3",
 "data": {
  "label": "Circle 01a"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_11AC3D3D_004A_F94E_4142_D27F9A1181D7, this.camera_104F89E0_0618_AE32_4180_E92F3AF7AEB0); this.mainPlayList.set('selectedIndex', 23)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -118.62,
   "hfov": 18.75,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_1_HS_2_0_0_map.gif",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -0.29
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "yaw": -118.62,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_1_HS_2_0.png",
      "width": 260,
      "height": 260
     }
    ]
   },
   "pitch": -0.29,
   "hfov": 18.75
  }
 ],
 "id": "overlay_130FD6F2_0049_28DA_4153_0942010BB82E",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A, this.camera_134B6C05_0618_A5F2_4194_CC6D49DA2647); this.mainPlayList.set('selectedIndex', 12)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -50.85,
   "hfov": 16.41,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4_1_HS_0_0_0_map.gif",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -32.43
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_EE94B519_C634_79C3_41E2_987DBE2A3C20",
   "yaw": -50.85,
   "pitch": -32.43,
   "distance": 100,
   "hfov": 16.41
  }
 ],
 "id": "overlay_D7296732_C3F0_99BD_41CD_15546F96B28A",
 "data": {
  "label": "Circle 01a"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_0C72BAA0_0039_5B76_4145_C1EF94F793A0, this.camera_13443C0D_0618_A5F2_4195_9C9AD6B260B9); this.mainPlayList.set('selectedIndex', 14)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -93.55,
   "hfov": 9.11,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4_0_HS_2_0_0_map.gif",
      "width": 16,
      "height": 17
     }
    ]
   },
   "pitch": 1.91
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "yaw": -93.55,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4_0_HS_2_0.png",
      "width": 126,
      "height": 137
     }
    ]
   },
   "pitch": 1.91,
   "hfov": 9.11
  }
 ],
 "id": "overlay_1497DBE8_0678_E232_4180_BC51F5A3B938",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9, this.camera_1365FC26_0618_A631_4191_B53DE62D784F); this.mainPlayList.set('selectedIndex', 35)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -77.5,
   "hfov": 13.71,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C8E8EEF1_C391_88BE_41E1_593F441770DA_1_HS_0_0_0_map.gif",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": -43.34
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_EE9E7522_C634_79C1_41D2_BDC23086CB3A",
   "yaw": -77.5,
   "pitch": -43.34,
   "distance": 100,
   "hfov": 13.71
  }
 ],
 "id": "overlay_D0EB7FEB_C674_4847_41D1_C5CAD7EE65EC",
 "data": {
  "label": "Arrow 01"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C8E21D8B_C38F_8962_41E8_4ED88E72A8E4, this.camera_1369DC1E_0618_A611_4196_78EFF06637A5); this.mainPlayList.set('selectedIndex', 30)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -4.73,
   "hfov": 14.6,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C8E8EEF1_C391_88BE_41E1_593F441770DA_1_HS_1_0_0_map.gif",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -20.55
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_EE9FE523_C634_79C7_41DF_1F6FC3B5DE01",
   "yaw": -4.73,
   "pitch": -20.55,
   "distance": 100,
   "hfov": 14.6
  }
 ],
 "id": "overlay_D17567AD_C674_58C3_41C9_B73C22230BA4",
 "data": {
  "label": "Circle 01a"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B, this.camera_137FBC2E_0618_A631_4189_4E84247120D8); this.mainPlayList.set('selectedIndex', 42)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 35.45,
   "hfov": 15.2,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C8E8EEF1_C391_88BE_41E1_593F441770DA_1_HS_2_0_0_map.gif",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 5.08
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "yaw": 35.45,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C8E8EEF1_C391_88BE_41E1_593F441770DA_1_HS_2_0.png",
      "width": 212,
      "height": 200
     }
    ]
   },
   "pitch": 5.08,
   "hfov": 15.2
  }
 ],
 "id": "overlay_D11844E5_C674_7843_41DB_71EEDEBF776A",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C8E03182_C390_F962_41E3_AA944CB11FB1, this.camera_107BBA10_0618_A211_4156_8F1722561380); this.mainPlayList.set('selectedIndex', 16)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -145.19,
   "hfov": 20.21,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_1_HS_0_0_0_map.gif",
      "width": 16,
      "height": 18
     }
    ]
   },
   "pitch": 0.66
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "yaw": -145.19,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_1_HS_0_0.png",
      "width": 280,
      "height": 330
     }
    ]
   },
   "pitch": 0.66,
   "hfov": 20.21
  }
 ],
 "id": "overlay_D409C066_C655_F841_41C2_9E382AAA888D",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9, this.camera_100B1A22_0618_A236_4198_E775406AFF23); this.mainPlayList.set('selectedIndex', 25)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -20.79,
   "hfov": 16.2,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_1_HS_1_0_0_map.gif",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -33.56
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_EE93A51E_C634_79C1_41E1_1FE79DE4D4E8",
   "yaw": -20.79,
   "pitch": -33.56,
   "distance": 100,
   "hfov": 16.2
  }
 ],
 "id": "overlay_D4F58EF9_C654_C843_41C9_E71581556A11",
 "data": {
  "label": "Circle 01a"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5, this.camera_10701CC2_0618_A676_4196_4E0985C924C7); this.mainPlayList.set('selectedIndex', 6)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -3.63,
   "hfov": 15.57,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_0B55BDE4_0039_38FE_4139_E851DEBF7C58_1_HS_0_0_0_map.gif",
      "width": 19,
      "height": 16
     }
    ]
   },
   "pitch": -2.96
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "yaw": -3.63,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_0B55BDE4_0039_38FE_4139_E851DEBF7C58_1_HS_0_0.png",
      "width": 259,
      "height": 209
     }
    ]
   },
   "pitch": -2.96,
   "hfov": 15.57
  }
 ],
 "id": "overlay_12802B79_0076_D9D6_40D5_A735950E3D00",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0, this.camera_12906BE6_0618_A231_4182_2A98B5AFFC25); this.mainPlayList.set('selectedIndex', 57)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -49.96,
   "hfov": 16.41,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA_1_HS_0_0_0_map.gif",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -32.43
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_EE85E53C_C634_79C1_41DB_7F3562B22FD2",
   "yaw": -49.96,
   "pitch": -32.43,
   "distance": 100,
   "hfov": 16.41
  }
 ],
 "id": "overlay_E24DF921_C64C_C9C3_41E0_1DE050A43B4D",
 "data": {
  "label": "Circle 01a"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 59)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -93.55,
   "hfov": 8.11,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA_0_HS_2_0_0_map.gif",
      "width": 16,
      "height": 21
     }
    ]
   },
   "pitch": 0.4
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "yaw": -93.55,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA_0_HS_2_0.png",
      "width": 112,
      "height": 151
     }
    ]
   },
   "pitch": 0.4,
   "hfov": 8.11
  }
 ],
 "id": "overlay_12D086AB_0608_6236_4191_C3F4174FECF3",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 12)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -4.26,
   "hfov": 12.79,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_118B7384_0049_E93E_4136_7E71C475A6E0_1_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -4.59
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "yaw": -4.26,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_118B7384_0049_E93E_4136_7E71C475A6E0_1_HS_0_0.png",
      "width": 213,
      "height": 205
     }
    ]
   },
   "pitch": -4.59,
   "hfov": 12.79
  }
 ],
 "id": "overlay_17D9B17A_0059_69CA_412E_7A0DA76B62F0",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C857B562_C391_99A2_41D4_622CFBF52C0A, this.camera_10A87D18_0618_A612_4124_E78C4F89CDE0); this.mainPlayList.set('selectedIndex', 4)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 4.72,
   "hfov": 9.87,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_CF1013BA_C391_98A2_4167_0505D502E364_1_HS_0_0_0_map.gif",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": -30.32
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_EEA93516_C634_79C1_41D5_E7DFC2676D36",
   "yaw": 4.72,
   "pitch": -30.32,
   "distance": 100,
   "hfov": 9.87
  }
 ],
 "id": "overlay_D178C03E_C3F0_B7A5_41CB_0834EED7746E",
 "data": {
  "label": "Arrow 01"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C8E22910_C38F_897E_41BD_C3761AC35EAF, this.camera_130BB979_0618_AE12_4190_9892AAC8D408); this.mainPlayList.set('selectedIndex', 0)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 144.86,
   "hfov": 16.15,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C8443AAC_C390_88A6_41E1_B9756BC8A56B_1_HS_0_0_0_map.gif",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -29.36
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_EEAB6513_C634_79C7_41C5_016AAFA35151",
   "yaw": 144.86,
   "pitch": -29.36,
   "distance": 100,
   "hfov": 16.15
  }
 ],
 "id": "overlay_D3E76ABF_C3F1_88A2_41C2_2B986BB16AE4",
 "data": {
  "label": "Circle 01a"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5, this.camera_1329F988_0618_AEF2_4172_A79498E78C8F); this.mainPlayList.set('selectedIndex', 6)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -125.71,
   "hfov": 10.29,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C8443AAC_C390_88A6_41E1_B9756BC8A56B_1_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 1.53
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "yaw": -125.71,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C8443AAC_C390_88A6_41E1_B9756BC8A56B_1_HS_1_0.png",
      "width": 171,
      "height": 171
     }
    ]
   },
   "pitch": 1.53,
   "hfov": 10.29
  }
 ],
 "id": "overlay_D33D2D6F_C3F0_89A3_41A0_BD4E7B18DF22",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9, this.camera_137E7971_0618_AE12_4192_683FE3183BE0); this.mainPlayList.set('selectedIndex', 9)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 135.92,
   "hfov": 8.1,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C8443AAC_C390_88A6_41E1_B9756BC8A56B_1_HS_2_0_0_map.gif",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 0.02
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_EEA8F514_C634_79C1_41D2_016258F6485B",
   "yaw": 135.92,
   "pitch": 0.02,
   "distance": 50,
   "hfov": 8.1
  }
 ],
 "id": "overlay_D20E9669_C3F1_BBAF_41DD_B912974B3B2A",
 "data": {
  "label": "Arrow 01 Left"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ED86F742_E6E7_4822_41BC_D0EBB6B298F9, this.camera_131B0981_0618_AEF2_4191_1705311A36F1); this.mainPlayList.set('selectedIndex', 2)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -0.24,
   "hfov": 12.29,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C8443AAC_C390_88A6_41E1_B9756BC8A56B_1_HS_3_0_0_map.gif",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": 4.58
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "yaw": -0.24,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C8443AAC_C390_88A6_41E1_B9756BC8A56B_1_HS_3_0.png",
      "width": 205,
      "height": 192
     }
    ]
   },
   "pitch": 4.58,
   "hfov": 12.29
  }
 ],
 "id": "overlay_E9702FC2_E6EE_D81D_4196_3D022E74FA68",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C8E22910_C38F_897E_41BD_C3761AC35EAF, this.camera_1163DD40_0618_A672_4197_C903AAE9E6D2); this.mainPlayList.set('selectedIndex', 0)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 103.26,
   "hfov": 16.3,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_0DDD37F8_019B_0738_4165_2278D9DB7F90_1_HS_0_0_0_map.gif",
      "width": 17,
      "height": 15
     }
    ]
   },
   "pitch": 3.59
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "yaw": 103.26,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_0DDD37F8_019B_0738_4165_2278D9DB7F90_1_HS_0_0.png",
      "width": 272,
      "height": 253
     }
    ]
   },
   "pitch": 3.59,
   "hfov": 16.3
  }
 ],
 "id": "overlay_0EC38AAB_019F_09D8_4148_F13840F3A30E",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5, this.camera_10EACCF8_0618_A611_4197_D27AB8A10F51); this.mainPlayList.set('selectedIndex', 40)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -131.63,
   "hfov": 10.82,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_11906CBC_0049_DF4E_411B_4127E5D5F480_1_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 0.93
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "yaw": -131.63,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_11906CBC_0049_DF4E_411B_4127E5D5F480_1_HS_0_0.png",
      "width": 180,
      "height": 171
     }
    ]
   },
   "pitch": 0.93,
   "hfov": 10.82
  }
 ],
 "id": "overlay_18E3C57F_0057_29CA_4147_F4600E232D3B",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5, this.camera_12888BCD_0618_A272_4192_F613F5DEE84F); this.mainPlayList.set('selectedIndex', 6)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -64.1,
   "hfov": 14.14,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23_1_HS_0_0_0_map.gif",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -30.57
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_EE96F517_C634_79CF_41DD_B98B1CDAC4EF",
   "yaw": -64.1,
   "pitch": -30.57,
   "distance": 100,
   "hfov": 14.14
  }
 ],
 "id": "overlay_D1422BDB_C3F3_88E2_41BD_FA3D9EE50658",
 "data": {
  "label": "Circle 01a"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6, this.camera_11726D55_0618_A613_4176_A06FF80AF8F2); this.mainPlayList.set('selectedIndex', 43)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 59.92,
   "hfov": 15.59,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_135DA583_0049_293A_414E_3C25985D46CB_1_HS_0_0_0_map.gif",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": -0.82
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "yaw": 59.92,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_135DA583_0049_293A_414E_3C25985D46CB_1_HS_0_0.png",
      "width": 259,
      "height": 238
     }
    ]
   },
   "pitch": -0.82,
   "hfov": 15.59
  }
 ],
 "id": "overlay_19FC6A44_0049_7B3E_4152_6EC2AFFF8366",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4, this.camera_138209C0_0618_AE72_4197_A39BB06A9E4A); this.mainPlayList.set('selectedIndex', 13)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 44.28,
   "hfov": 16.28,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_1_HS_0_0_0_map.gif",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -33.11
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_EE973518_C634_79C1_41B1_D4F6FE4DD0CE",
   "yaw": 44.28,
   "pitch": -33.11,
   "distance": 100,
   "hfov": 16.28
  }
 ],
 "id": "overlay_D7B8A38F_C3F7_B962_4174_75177DEADA11",
 "data": {
  "label": "Circle 01a"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C857B562_C391_99A2_41D4_622CFBF52C0A, this.camera_13F479B8_0618_AE12_418C_A581B0B388BA); this.mainPlayList.set('selectedIndex', 4)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 153.25,
   "hfov": 14.7,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_1_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 2.75
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "yaw": 153.25,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_1_HS_1_0.png",
      "width": 204,
      "height": 212
     }
    ]
   },
   "pitch": 2.75,
   "hfov": 14.7
  }
 ],
 "id": "overlay_D7F45601_C3F0_BB5E_41C2_C0C993F67D5C",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A, this.camera_11440D30_0618_A612_4190_920F944CB4DE); this.mainPlayList.set('selectedIndex', 36)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -125.71,
   "hfov": 10.3,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C8E097E2_C390_F8A2_419E_45918FB20A48_1_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 0.5
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "yaw": -125.71,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C8E097E2_C390_F8A2_419E_45918FB20A48_1_HS_0_0.png",
      "width": 171,
      "height": 171
     }
    ]
   },
   "pitch": 0.5,
   "hfov": 10.3
  }
 ],
 "id": "overlay_D3405AA1_C64C_48C3_41AC_D04C40137A31",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C8E21D8B_C38F_8962_41E8_4ED88E72A8E4, this.camera_11547D38_0618_A612_4188_510953FE1C3A); this.mainPlayList.set('selectedIndex', 30)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 153.23,
   "hfov": 15.79,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C8E097E2_C390_F8A2_419E_45918FB20A48_1_HS_1_0_0_map.gif",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -31.56
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_EE9EA521_C634_79C3_41CB_87B2F5C5B2E2",
   "yaw": 153.23,
   "pitch": -31.56,
   "distance": 100,
   "hfov": 15.79
  }
 ],
 "id": "overlay_D3F9A377_C64C_384F_41A6_37339C461757",
 "data": {
  "label": "Circle 01a"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0, this.camera_10B59D27_0618_A63E_4195_E456D776710A); this.mainPlayList.set('selectedIndex', 39)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 136.48,
   "hfov": 10.26,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C8E097E2_C390_F8A2_419E_45918FB20A48_1_HS_2_0_0_map.gif",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 4.68
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_EE9E2522_C634_79C1_41C5_07C0CEC09C22",
   "yaw": 136.48,
   "pitch": 4.68,
   "distance": 50,
   "hfov": 10.26
  }
 ],
 "id": "overlay_D3B6FDAD_C64C_48C3_41CA_3934E98FB99D",
 "data": {
  "label": "Arrow 01 Left"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ED4C0B8B_E6E7_5822_41E3_51E3E08986AA, this.camera_10A67D20_0618_A632_4191_2F63E8BC2EAC); this.mainPlayList.set('selectedIndex', 32)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -1.88,
   "hfov": 9.03,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C8E097E2_C390_F8A2_419E_45918FB20A48_1_HS_3_0_0_map.gif",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 4.58
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "yaw": -1.88,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C8E097E2_C390_F8A2_419E_45918FB20A48_1_HS_3_0.png",
      "width": 151,
      "height": 151
     }
    ]
   },
   "pitch": 4.58,
   "hfov": 9.03
  }
 ],
 "id": "overlay_F66A4064_E6E5_48E5_41DD_EE48C967EACA",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C8E84376_C391_79A5_41A5_D6230668BC5C, this.camera_139279C9_0618_AE73_4192_AB67E93D2D86); this.mainPlayList.set('selectedIndex', 49)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 6.37,
   "hfov": 10,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_E609D5D6_C65C_5841_41DC_4408506ECD34_1_HS_0_0_0_map.gif",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": -29.08
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_EE85753D_C634_79C3_41D0_D071D6C1482E",
   "yaw": 6.37,
   "pitch": -29.08,
   "distance": 100,
   "hfov": 10
  }
 ],
 "id": "overlay_E2FE88E0_C64D_C841_41C3_2E195A899599",
 "data": {
  "label": "Arrow 01"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 19)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 151.74,
   "hfov": 16.09,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_1_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 1.1
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "yaw": 151.74,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_1_HS_0_0.png",
      "width": 223,
      "height": 219
     }
    ]
   },
   "pitch": 1.1,
   "hfov": 16.09
  }
 ],
 "id": "overlay_D52AF8AA_C65C_C8C1_41E1_368B77920405",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D, this.camera_10B0AAF4_0618_A212_416F_723651DE2067); this.mainPlayList.set('selectedIndex', 28)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 43.8,
   "hfov": 16.94,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_1_HS_1_0_0_map.gif",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -29.41
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_EE90B51F_C634_79FF_41C5_A79C01C84446",
   "yaw": 43.8,
   "pitch": -29.41,
   "distance": 100,
   "hfov": 16.94
  }
 ],
 "id": "overlay_D5F4BE96_C654_C8C1_41E5_91FDE5D191D9",
 "data": {
  "label": "Circle 01a"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C8E21D8B_C38F_8962_41E8_4ED88E72A8E4, this.camera_135FEC16_0618_A611_4169_4CB18DD19580); this.mainPlayList.set('selectedIndex', 30)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 105.8,
   "hfov": 18.26,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_0E9BEAA3_0199_09C8_416E_D3D5D37321FD_1_HS_0_0_0_map.gif",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": 0.84
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "yaw": 105.8,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_0E9BEAA3_0199_09C8_416E_D3D5D37321FD_1_HS_0_0.png",
      "width": 304,
      "height": 272
     }
    ]
   },
   "pitch": 0.84,
   "hfov": 18.26
  }
 ],
 "id": "overlay_105CC9D2_01A7_0B48_4158_008E8092F603",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590, this.camera_10985D10_0618_A612_4197_726189AFA414); this.mainPlayList.set('selectedIndex', 21)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -5.52,
   "hfov": 11.78,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_11AC3D3D_004A_F94E_4142_D27F9A1181D7_1_HS_0_0_0_map.gif",
      "width": 15,
      "height": 16
     }
    ]
   },
   "pitch": -4.72
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "yaw": -5.52,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_11AC3D3D_004A_F94E_4142_D27F9A1181D7_1_HS_0_0.png",
      "width": 197,
      "height": 209
     }
    ]
   },
   "pitch": -4.72,
   "hfov": 11.78
  }
 ],
 "id": "overlay_146737F2_0057_E8DA_4155_00C91D7C48D2",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A, this.camera_12FDFBBD_0618_A212_4192_53951EDC0C89); this.mainPlayList.set('selectedIndex', 36)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -65.68,
   "hfov": 11.23,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5_1_HS_0_0_0_map.gif",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -39.22
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_EE9D8526_C634_79C1_41D1_BFDADEF90055",
   "yaw": -65.68,
   "pitch": -39.22,
   "distance": 100,
   "hfov": 11.23
  }
 ],
 "id": "overlay_DEEEAE21_C674_CBC3_41DF_981A8131049C",
 "data": {
  "label": "Circle 01a"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C845D458_C38F_7FEE_41AF_209B05ABC3B4, this.camera_13489951_0618_AE12_4153_674FDCC8495A); this.mainPlayList.set('selectedIndex', 15)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 146.64,
   "hfov": 10.89,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C8E03182_C390_F962_41E3_AA944CB11FB1_1_HS_0_0_0_map.gif",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -26.96
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_EE95B51A_C634_79C1_41AA_C27846BCCE73",
   "yaw": 146.64,
   "pitch": -26.96,
   "distance": 100,
   "hfov": 10.89
  }
 ],
 "id": "overlay_C8D35665_C635_D843_41C9_9D8B672250E4",
 "data": {
  "label": "Circle 01a"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590, this.camera_12BD1949_0618_AE72_417C_BA33B4637854); this.mainPlayList.set('selectedIndex', 21)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -123.79,
   "hfov": 10.3,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C8E03182_C390_F962_41E3_AA944CB11FB1_1_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -0.53
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "yaw": -123.79,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C8E03182_C390_F962_41E3_AA944CB11FB1_1_HS_1_0.png",
      "width": 171,
      "height": 171
     }
    ]
   },
   "pitch": -0.53,
   "hfov": 10.3
  }
 ],
 "id": "overlay_C90800DC_C634_F841_41DC_32CC6E30E91E",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5, this.camera_13450959_0618_AE12_418C_97AC74D09A89); this.mainPlayList.set('selectedIndex', 24)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 135.94,
   "hfov": 6.99,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C8E03182_C390_F962_41E3_AA944CB11FB1_1_HS_2_0_0_map.gif",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 2.63
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_EE94B51B_C634_79C7_41E7_DF3C12E87276",
   "yaw": 135.94,
   "pitch": 2.63,
   "distance": 50,
   "hfov": 6.99
  }
 ],
 "id": "overlay_C9007F6B_C637_C847_41AC_9B1840EF4CA4",
 "data": {
  "label": "Arrow 01 Left"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ED9C7DE8_E6E7_3BEE_41CC_66F6977CF4A0, this.camera_1350D961_0618_AE32_4195_7683EF86389E); this.mainPlayList.set('selectedIndex', 17)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -0.12,
   "hfov": 11.03,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C8E03182_C390_F962_41E3_AA944CB11FB1_1_HS_3_0_0_map.gif",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 4.7
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "yaw": -0.12,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C8E03182_C390_F962_41E3_AA944CB11FB1_1_HS_3_0.png",
      "width": 184,
      "height": 180
     }
    ]
   },
   "pitch": 4.7,
   "hfov": 11.03
  }
 ],
 "id": "overlay_E91B578A_E6EB_C822_41E0_D3C517571420",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9, this.camera_10FA1D00_0618_A7F2_4198_E76972FC0940); this.mainPlayList.set('selectedIndex', 25)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -130.75,
   "hfov": 12.56,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_11B27642_004A_EB3A_4142_7CBC8EFC0A22_1_HS_0_0_0_map.gif",
      "width": 16,
      "height": 17
     }
    ]
   },
   "pitch": 3.32
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "yaw": -130.75,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_11B27642_004A_EB3A_4142_7CBC8EFC0A22_1_HS_0_0.png",
      "width": 209,
      "height": 234
     }
    ]
   },
   "pitch": 3.32,
   "hfov": 12.56
  }
 ],
 "id": "overlay_1419C47C_0059_EFCE_4151_9254754CC460",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C8E07E20_C390_8B5D_41D7_DBEAC9716594, this.camera_10376A6C_0618_A232_417C_BA6727CCE9A5); this.mainPlayList.set('selectedIndex', 46)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -145.32,
   "hfov": 19.38,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_1_HS_0_0_0_map.gif",
      "width": 16,
      "height": 18
     }
    ]
   },
   "pitch": -0.85
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "yaw": -145.32,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_1_HS_0_0.png",
      "width": 269,
      "height": 311
     }
    ]
   },
   "pitch": -0.85,
   "hfov": 19.38
  }
 ],
 "id": "overlay_E468F0B7_C654_58CF_41DE_C89AEED028EF",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 55)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -26.28,
   "hfov": 15.67,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_1_HS_1_0_0_map.gif",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -36.3
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_EE872539_C634_79C3_41C0_5F139E4D450B",
   "yaw": -26.28,
   "pitch": -36.3,
   "distance": 100,
   "hfov": 15.67
  }
 ],
 "id": "overlay_E4E80CAC_C657_C8C1_41D8_7F180578F07D",
 "data": {
  "label": "Circle 01a"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C845D458_C38F_7FEE_41AF_209B05ABC3B4, this.camera_139ABC8B_0618_A6F6_4197_7EBB25570951); this.mainPlayList.set('selectedIndex', 15)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 103.66,
   "hfov": 18.26,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_0EF390FE_019F_1938_4173_7E5BC178F7F6_1_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 0.31
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "yaw": 103.66,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_0EF390FE_019F_1938_4173_7E5BC178F7F6_1_HS_0_0.png",
      "width": 304,
      "height": 308
     }
    ]
   },
   "pitch": 0.31,
   "hfov": 18.26
  }
 ],
 "id": "overlay_11D521B2_019B_1BC8_416F_DC66A9296BC0",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C8E097E2_C390_F8A2_419E_45918FB20A48, this.camera_10920AD8_0618_A211_416D_A02629EA042C); this.mainPlayList.set('selectedIndex', 31)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 127.05,
   "hfov": 11.62,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C8E21D8B_C38F_8962_41E8_4ED88E72A8E4_1_HS_0_0_0_map.gif",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -33.59
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_EE904520_C634_79C1_41D2_C80236AFDEAF",
   "yaw": 127.05,
   "pitch": -33.59,
   "distance": 100,
   "hfov": 11.62
  }
 ],
 "id": "overlay_D23040EA_C64C_D841_41DD_F09C37DF4C5B",
 "data": {
  "label": "Circle 01a"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C8E8EEF1_C391_88BE_41E1_593F441770DA, this.camera_10A0FAEA_0618_A236_4175_65A5A838C9BB); this.mainPlayList.set('selectedIndex', 34)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 6.94,
   "hfov": 11.23,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C8E21D8B_C38F_8962_41E8_4ED88E72A8E4_1_HS_1_0_0_map.gif",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -20.96
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_EE91C521_C634_79C3_41CC_F17162481F82",
   "yaw": 6.94,
   "pitch": -20.96,
   "distance": 100,
   "hfov": 11.23
  }
 ],
 "id": "overlay_D29C36D7_C64C_384F_41E4_FDFADB56E550",
 "data": {
  "label": "Circle 01a"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_0E9BEAA3_0199_09C8_416E_D3D5D37321FD, this.camera_1082BACA_0618_A271_4161_8027F0A06462); this.mainPlayList.set('selectedIndex', 33)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -56.51,
   "hfov": 10.87,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C8E21D8B_C38F_8962_41E8_4ED88E72A8E4_1_HS_2_0_0_map.gif",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 0.28
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "yaw": -56.51,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C8E21D8B_C38F_8962_41E8_4ED88E72A8E4_1_HS_2_0.png",
      "width": 150,
      "height": 150
     }
    ]
   },
   "pitch": 0.28,
   "hfov": 10.87
  }
 ],
 "id": "overlay_10608B0B_0199_08D8_4160_B730FA25DF4F",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C8E07E20_C390_8B5D_41D7_DBEAC9716594, this.camera_12F38BC5_0618_A272_4198_B65625840429); this.mainPlayList.set('selectedIndex', 46)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -169.06,
   "hfov": 16.83,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_ED9F2470_E6E6_C8FD_41E9_754A21DFFA46_1_HS_0_0_0_map.gif",
      "width": 16,
      "height": 18
     }
    ]
   },
   "pitch": 2.82
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "yaw": -169.06,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_ED9F2470_E6E6_C8FD_41E9_754A21DFFA46_1_HS_0_0.png",
      "width": 280,
      "height": 318
     }
    ]
   },
   "pitch": 2.82,
   "hfov": 16.83
  }
 ],
 "id": "overlay_F4E33909_E6E5_582E_41E2_8DFE91F0764C",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C8E097E2_C390_F8A2_419E_45918FB20A48, this.camera_11399B39_0618_A213_417D_61D4C1EB6EAC); this.mainPlayList.set('selectedIndex', 31)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -148.21,
   "hfov": 22.75,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_1_HS_0_0_0_map.gif",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": 7.66
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "yaw": -148.21,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_1_HS_0_0.png",
      "width": 318,
      "height": 295
     }
    ]
   },
   "pitch": 7.66,
   "hfov": 22.75
  }
 ],
 "id": "overlay_DF50E086_C674_38C1_41C4_7464DFF3A926",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5, this.camera_11C9CB41_0618_A273_4198_6A96C8140FB8); this.mainPlayList.set('selectedIndex', 40)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -21.75,
   "hfov": 15.34,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_1_HS_1_0_0_map.gif",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -37.88
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_EE9D7527_C634_79CF_41D8_0EE7C8EAC465",
   "yaw": -21.75,
   "pitch": -37.88,
   "distance": 100,
   "hfov": 15.34
  }
 ],
 "id": "overlay_DFC10996_C674_48CE_41D4_631A257C6571",
 "data": {
  "label": "Circle 01a"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4, this.camera_1062CCBA_0618_A611_415B_146402955132); this.mainPlayList.set('selectedIndex', 13)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 60.43,
   "hfov": 14.59,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_0C72BAA0_0039_5B76_4145_C1EF94F793A0_1_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 0.43
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "yaw": 60.43,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_0C72BAA0_0039_5B76_4145_C1EF94F793A0_1_HS_0_0.png",
      "width": 243,
      "height": 238
     }
    ]
   },
   "pitch": 0.43,
   "hfov": 14.59
  }
 ],
 "id": "overlay_117BAD49_0079_5936_4155_38DBB5BBB748",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590, this.camera_10DCECF0_0618_A611_4195_1FFFA4E0199F); this.mainPlayList.set('selectedIndex', 21)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -61.42,
   "hfov": 13.24,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2_1_HS_0_0_0_map.gif",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -33.44
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_EE92251D_C634_79C3_41D0_BCD536C9B445",
   "yaw": -61.42,
   "pitch": -33.44,
   "distance": 100,
   "hfov": 13.24
  }
 ],
 "id": "overlay_D4424B68_C654_C841_41AA_04E4BDB57422",
 "data": {
  "label": "Circle 01a"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7, this.camera_130BCC36_0618_A611_4155_1940D351918F); this.mainPlayList.set('selectedIndex', 27)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -54.9,
   "hfov": 16.46,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D_1_HS_0_0_0_map.gif",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -32.15
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_EE902520_C634_79C1_41BF_257FBF304234",
   "yaw": -54.9,
   "pitch": -32.15,
   "distance": 100,
   "hfov": 16.46
  }
 ],
 "id": "overlay_D25D23DA_C655_D841_41D7_0482A8407978",
 "data": {
  "label": "Circle 01a"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_136FCF41_004A_D936_4151_FFADF2CFBA26, this.camera_1307EC3E_0618_A611_4178_52879C0A440E); this.mainPlayList.set('selectedIndex', 29)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -94.17,
   "hfov": 10.84,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D_0_HS_2_0_0_map.gif",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 4.17
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "yaw": -94.17,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D_0_HS_2_0.png",
      "width": 151,
      "height": 151
     }
    ]
   },
   "pitch": 4.17,
   "hfov": 10.84
  }
 ],
 "id": "overlay_141820D1_0608_DE13_4184_3BBBDEF95731",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068, this.camera_10005CC9_0618_A672_4196_4B5B798E69F9); this.mainPlayList.set('selectedIndex', 51)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -3.63,
   "hfov": 14.55,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_118D55D0_004A_E8D6_412B_F15016B43EC0_1_HS_0_0_0_map.gif",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": -4.34
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "yaw": -3.63,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_118D55D0_004A_E8D6_412B_F15016B43EC0_1_HS_0_0.png",
      "width": 243,
      "height": 222
     }
    ]
   },
   "pitch": -4.34,
   "hfov": 14.55
  }
 ],
 "id": "overlay_1AF1323F_0049_6B4A_4158_18971B8C0B2E",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA, this.camera_13397990_0618_AE12_415D_71CD813C5740); this.mainPlayList.set('selectedIndex', 58)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 37.62,
   "hfov": 16.71,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_1_HS_0_0_0_map.gif",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -30.71
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_EE84253B_C634_79C7_41E0_968E01AFCA33",
   "yaw": 37.62,
   "pitch": -30.71,
   "distance": 100,
   "hfov": 16.71
  }
 ],
 "id": "overlay_E54E0653_C654_5847_41E2_4F2F79E153AD",
 "data": {
  "label": "Circle 01a"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C8E84376_C391_79A5_41A5_D6230668BC5C, this.camera_13375998_0618_AE12_4197_2CA2D2C2241C); this.mainPlayList.set('selectedIndex', 49)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 152.97,
   "hfov": 16.9,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_1_HS_1_0_0_map.gif",
      "width": 18,
      "height": 16
     }
    ]
   },
   "pitch": 2.34
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "yaw": 152.97,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_1_HS_1_0.png",
      "width": 234,
      "height": 208
     }
    ]
   },
   "pitch": 2.34,
   "hfov": 16.9
  }
 ],
 "id": "overlay_E5F8F5BF_C654_583F_41E0_5A5263ACE886",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9, this.camera_12E27BAC_0618_A232_4197_4BE77DFF436E); this.mainPlayList.set('selectedIndex', 9)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 88.82,
   "hfov": 14.26,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40_1_HS_0_0_0_map.gif",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -42.82
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_EE978518_C634_79C1_41BF_08456E54B1D1",
   "yaw": 88.82,
   "pitch": -42.82,
   "distance": 100,
   "hfov": 14.26
  }
 ],
 "id": "overlay_D06F55C7_C3F0_98E2_41E3_464100BECDC1",
 "data": {
  "label": "Circle 01a"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_0B65F72F_0039_294A_413D_7167CFDDAD60, this.camera_12ED2BA4_0618_A232_4195_1318CD779F79); this.mainPlayList.set('selectedIndex', 11)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 119.11,
   "hfov": 10.87,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40_0_HS_2_0_0_map.gif",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 0.58
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "yaw": 119.11,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40_0_HS_2_0.png",
      "width": 151,
      "height": 151
     }
    ]
   },
   "pitch": 0.58,
   "hfov": 10.87
  }
 ],
 "id": "overlay_09FA2596_0678_A611_4196_27395AC63D08",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C8E759F9_C391_88AE_41D0_5C4EF78B7034, this.camera_108A7D08_0618_A7F2_418D_A8583159699A); this.mainPlayList.set('selectedIndex', 19)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 6.37,
   "hfov": 9.39,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA_1_HS_0_0_0_map.gif",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": -34.85
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_EE95D51C_C634_79C1_41D1_15DF599FD598",
   "yaw": 6.37,
   "pitch": -34.85,
   "distance": 100,
   "hfov": 9.39
  }
 ],
 "id": "overlay_D6BEFA7F_C64C_483F_41C3_9F7466FB8F67",
 "data": {
  "label": "Arrow 01"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C8E03182_C390_F962_41E3_AA944CB11FB1, this.camera_10F37AB8_0618_A211_4145_6DF534E20CA8); this.mainPlayList.set('selectedIndex', 16)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 123.01,
   "hfov": 16.62,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C845D458_C38F_7FEE_41AF_209B05ABC3B4_1_HS_0_0_0_map.gif",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -31.26
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_EE94F519_C634_79C3_41E7_CF7F35AA8B57",
   "yaw": 123.01,
   "pitch": -31.26,
   "distance": 100,
   "hfov": 16.62
  }
 ],
 "id": "overlay_CBF6E3D4_C63C_F841_41B1_3D0CA7E88D7D",
 "data": {
  "label": "Circle 01a"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C8E759F9_C391_88AE_41D0_5C4EF78B7034, this.camera_10D57A92_0618_A211_4194_559C4575F730); this.mainPlayList.set('selectedIndex', 19)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 5.98,
   "hfov": 10.02,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C845D458_C38F_7FEE_41AF_209B05ABC3B4_1_HS_1_0_0_map.gif",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -19.87
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_EE94651A_C634_79C1_41C0_7213AD55ED9D",
   "yaw": 5.98,
   "pitch": -19.87,
   "distance": 100,
   "hfov": 10.02
  }
 ],
 "id": "overlay_C86EA64D_C633_D843_41D8_D6B51675C99B",
 "data": {
  "label": "Circle 01a"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_0EF390FE_019F_1938_4173_7E5BC178F7F6, this.camera_10E4DAA5_0618_A232_4194_49E1F31C3840); this.mainPlayList.set('selectedIndex', 18)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -57.26,
   "hfov": 11.13,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C845D458_C38F_7FEE_41AF_209B05ABC3B4_1_HS_2_0_0_map.gif",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": 2.61
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "yaw": -57.26,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C845D458_C38F_7FEE_41AF_209B05ABC3B4_1_HS_2_0.png",
      "width": 154,
      "height": 139
     }
    ]
   },
   "pitch": 2.61,
   "hfov": 11.13
  }
 ],
 "id": "overlay_0F5E6C38_0199_0938_416B_1ADD5C4C39E0",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40, this.camera_136E1969_0618_AE32_4197_A06FA44CFFE3); this.mainPlayList.set('selectedIndex', 10)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -130.12,
   "hfov": 13.33,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_0B65F72F_0039_294A_413D_7167CFDDAD60_1_HS_0_0_0_map.gif",
      "width": 19,
      "height": 16
     }
    ]
   },
   "pitch": 0.05
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "yaw": -130.12,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_0B65F72F_0039_294A_413D_7167CFDDAD60_1_HS_0_0.png",
      "width": 222,
      "height": 184
     }
    ]
   },
   "pitch": 0.05,
   "hfov": 13.33
  }
 ],
 "id": "overlay_1357338D_0077_294E_4147_F9D08C457157",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C8E097E2_C390_F8A2_419E_45918FB20A48, this.camera_10C68A7E_0618_A20E_4194_7EA011EA8D10); this.mainPlayList.set('selectedIndex', 31)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -163.03,
   "hfov": 17.65,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_ED4C0B8B_E6E7_5822_41E3_51E3E08986AA_1_HS_0_0_0_map.gif",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": 8.6
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "yaw": -163.03,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_ED4C0B8B_E6E7_5822_41E3_51E3E08986AA_1_HS_0_0.png",
      "width": 297,
      "height": 268
     }
    ]
   },
   "pitch": 8.6,
   "hfov": 17.65
  }
 ],
 "id": "overlay_F6A783DC_E6E5_4826_41EA_84317254A541",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_E609D5D6_C65C_5841_41DC_4408506ECD34, this.camera_112B0B2F_0618_A20E_418E_5A7E1D3677DE); this.mainPlayList.set('selectedIndex', 50)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -81.21,
   "hfov": 7.36,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C8E84376_C391_79A5_41A5_D6230668BC5C_1_HS_0_0_0_map.gif",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": -49.95
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_EE982534_C634_79C1_41B1_FCE0D32794A2",
   "yaw": -81.21,
   "pitch": -49.95,
   "distance": 100,
   "hfov": 7.36
  }
 ],
 "id": "overlay_D8F8C72D_C654_79C3_41E0_91645FDFE3E3",
 "data": {
  "label": "Arrow 01"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0, this.camera_110C9B1E_0618_A20E_4196_728A49A96664); this.mainPlayList.set('selectedIndex', 57)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 34.3,
   "hfov": 14.16,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C8E84376_C391_79A5_41A5_D6230668BC5C_1_HS_1_0_0_map.gif",
      "width": 15,
      "height": 16
     }
    ]
   },
   "pitch": 1.93
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "yaw": 34.3,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C8E84376_C391_79A5_41A5_D6230668BC5C_1_HS_1_0.png",
      "width": 196,
      "height": 204
     }
    ]
   },
   "pitch": 1.93,
   "hfov": 14.16
  }
 ],
 "id": "overlay_D9A2C71D_C65C_79C3_41E6_11CD592B17BA",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C8E1F231_C38F_9BBF_41C7_8B73F57AA26D, this.camera_111BEB26_0618_A23E_417D_01748EE085F8); this.mainPlayList.set('selectedIndex', 45)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -4.73,
   "hfov": 13.37,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C8E84376_C391_79A5_41A5_D6230668BC5C_1_HS_2_0_0_map.gif",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -22.75
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_EE992535_C634_79C3_41CC_0F82C39BF420",
   "yaw": -4.73,
   "pitch": -22.75,
   "distance": 100,
   "hfov": 13.37
  }
 ],
 "id": "overlay_E657F276_C65C_D841_41A5_62C616D8BAE0",
 "data": {
  "label": "Circle 01a"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C8E1F231_C38F_9BBF_41C7_8B73F57AA26D, this.camera_12982BDD_0618_A212_4191_C2CF7EA2635B); this.mainPlayList.set('selectedIndex', 45)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 107.93,
   "hfov": 14.69,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_0F2964AA_0199_39D8_415C_DAB75F704D09_1_HS_0_0_0_map.gif",
      "width": 16,
      "height": 19
     }
    ]
   },
   "pitch": 0.29
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "yaw": 107.93,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_0F2964AA_0199_39D8_415C_DAB75F704D09_1_HS_0_0.png",
      "width": 244,
      "height": 290
     }
    ]
   },
   "pitch": 0.29,
   "hfov": 14.69
  }
 ],
 "id": "overlay_12B3B3CD_01A9_1F58_4175_0448822DFE99",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A, this.camera_10529CB2_0618_A611_4147_C05ADCFA4CF8); this.mainPlayList.set('selectedIndex', 55)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -131.63,
   "hfov": 17.85,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_118A5E95_004A_FB5E_414F_25F73E14E9E4_1_HS_0_0_0_map.gif",
      "width": 21,
      "height": 16
     }
    ]
   },
   "pitch": -1.2
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "yaw": -131.63,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_118A5E95_004A_FB5E_414F_25F73E14E9E4_1_HS_0_0.png",
      "width": 297,
      "height": 226
     }
    ]
   },
   "pitch": -1.2,
   "hfov": 17.85
  }
 ],
 "id": "overlay_1BA8B30A_004F_694A_4158_016311CE43BA",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C8E03182_C390_F962_41E3_AA944CB11FB1, this.camera_13A0E9D0_0618_AE12_4196_9201C0D0C7DA); this.mainPlayList.set('selectedIndex', 16)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -169.32,
   "hfov": 16.35,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_ED9C7DE8_E6E7_3BEE_41CC_66F6977CF4A0_1_HS_0_0_0_map.gif",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": -0.2
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "yaw": -169.32,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_ED9C7DE8_E6E7_3BEE_41CC_66F6977CF4A0_1_HS_0_0.png",
      "width": 272,
      "height": 243
     }
    ]
   },
   "pitch": -0.2,
   "hfov": 16.35
  }
 ],
 "id": "overlay_F6E05386_E6EA_C822_41E5_EE608AF52782",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C8E8EEF1_C391_88BE_41E1_593F441770DA, this.camera_10455CAA_0618_A636_4153_F11200E7C35D); this.mainPlayList.set('selectedIndex', 34)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 5.82,
   "hfov": 9.97,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9_1_HS_0_0_0_map.gif",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": -29.36
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_EE9F5524_C634_79C1_4151_C56E80BD365E",
   "yaw": 5.82,
   "pitch": -29.36,
   "distance": 100,
   "hfov": 9.97
  }
 ],
 "id": "overlay_DE130192_C67C_38C1_41C4_0A4C5ECF7BB5",
 "data": {
  "label": "Arrow 01"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C8E22910_C38F_897E_41BD_C3761AC35EAF, this.camera_12ABCBEE_0618_A20E_4177_1168B04D1012); this.mainPlayList.set('selectedIndex', 0)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -5.35,
   "hfov": 17.95,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_1_HS_0_0_0_map.gif",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -22.61
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_EEA83515_C634_79C3_41D3_CD95A4DC902C",
   "yaw": -5.35,
   "pitch": -22.61,
   "distance": 100,
   "hfov": 17.95
  }
 ],
 "id": "overlay_D2F533D4_C3F3_98E5_41DC_C06241682CEA",
 "data": {
  "label": "Circle 01a"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CF1013BA_C391_98A2_4167_0505D502E364, this.camera_12BF8BFE_0618_A20E_4195_759912B84402); this.mainPlayList.set('selectedIndex', 5)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -82.58,
   "hfov": 8.09,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_1_HS_1_0_0_map.gif",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": -45.01
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_EEA85515_C634_79C3_41E0_6091C7CEDAF8",
   "yaw": -82.58,
   "pitch": -45.01,
   "distance": 100,
   "hfov": 8.09
  }
 ],
 "id": "overlay_D20E5953_C3F1_89E3_41E2_DE390783024A",
 "data": {
  "label": "Arrow 01"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A, this.camera_12A55BF6_0618_A21E_418C_FDA525E984E9); this.mainPlayList.set('selectedIndex', 12)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 35.46,
   "hfov": 10.85,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_1_HS_2_0_0_map.gif",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 3.3
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "yaw": 35.46,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_1_HS_2_0.png",
      "width": 150,
      "height": 150
     }
    ]
   },
   "pitch": 3.3,
   "hfov": 10.85
  }
 ],
 "id": "overlay_D181A890_C3F0_977D_41E6_810868AFA24B",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C8443AAC_C390_88A6_41E1_B9756BC8A56B, this.camera_13A71C9A_0618_A616_4192_89C5B295ADB8); this.mainPlayList.set('selectedIndex', 1)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 125.82,
   "hfov": 10.41,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C8E22910_C38F_897E_41BD_C3761AC35EAF_1_HS_0_0_0_map.gif",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -30.02
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_EEAAA508_C634_79C1_41D8_AB01FEA3A2FF",
   "yaw": 125.82,
   "pitch": -30.02,
   "distance": 100,
   "hfov": 10.41
  }
 ],
 "id": "overlay_CC924D89_C3F3_896E_41E4_09D608EE2A76",
 "data": {
  "label": "Circle 01a"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C857B562_C391_99A2_41D4_622CFBF52C0A, this.camera_13B67CA2_0618_A636_4194_B222C573FD60); this.mainPlayList.set('selectedIndex', 4)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 4.81,
   "hfov": 11.55,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C8E22910_C38F_897E_41BD_C3761AC35EAF_1_HS_1_0_0_map.gif",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -20.07
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_EEAB0513_C634_79C7_41E1_6DABE2DBB8E8",
   "yaw": 4.81,
   "pitch": -20.07,
   "distance": 100,
   "hfov": 11.55
  }
 ],
 "id": "overlay_CC66AADF_C3F0_88E3_41D2_C7310A6919B1",
 "data": {
  "label": "Circle 01a"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_0DDD37F8_019B_0738_4165_2278D9DB7F90, this.camera_13AA6C93_0618_A616_4192_BF5EC3A4E353); this.mainPlayList.set('selectedIndex', 3)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -55.84,
   "hfov": 10.59,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C8E22910_C38F_897E_41BD_C3761AC35EAF_1_HS_2_0_0_map.gif",
      "width": 16,
      "height": 19
     }
    ]
   },
   "pitch": 1.65
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "yaw": -55.84,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C8E22910_C38F_897E_41BD_C3761AC35EAF_1_HS_2_0.png",
      "width": 147,
      "height": 181
     }
    ]
   },
   "pitch": 1.65,
   "hfov": 10.59
  }
 ],
 "id": "overlay_0C2B3182_0199_7BC8_4166_8FB5F8F2C9AF",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40, this.camera_13D619A8_0618_AE32_417D_578ED58BAADE); this.mainPlayList.set('selectedIndex', 10)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -21.06,
   "hfov": 11.71,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_1_HS_0_0_0_map.gif",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -34.59
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_EE960517_C634_79CE_41A3_AD59E10D5AB0",
   "yaw": -21.06,
   "pitch": -34.59,
   "distance": 100,
   "hfov": 11.71
  }
 ],
 "id": "overlay_D0840BD8_C3F0_88ED_41D5_401F4C1D0F9A",
 "data": {
  "label": "Circle 01a"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C8443AAC_C390_88A6_41E1_B9756BC8A56B, this.camera_13C779A0_0618_AE32_4180_0B80877F92C8); this.mainPlayList.set('selectedIndex', 1)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -146.66,
   "hfov": 22.95,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_1_HS_1_0_0_map.gif",
      "width": 16,
      "height": 17
     }
    ]
   },
   "pitch": -0.47
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "yaw": -146.66,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_1_HS_1_0.png",
      "width": 318,
      "height": 349
     }
    ]
   },
   "pitch": -0.47,
   "hfov": 22.95
  }
 ],
 "id": "overlay_D0C5DA7D_C3F1_8BA7_41D0_40EE562498C3",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C8443AAC_C390_88A6_41E1_B9756BC8A56B, this.camera_106D19FE_0618_AE11_418D_6731319490E8); this.mainPlayList.set('selectedIndex', 1)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -171.32,
   "hfov": 17.85,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_ED86F742_E6E7_4822_41BC_D0EBB6B298F9_1_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 0.05
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "yaw": -171.32,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_ED86F742_E6E7_4822_41BC_D0EBB6B298F9_1_HS_0_0.png",
      "width": 297,
      "height": 301
     }
    ]
   },
   "pitch": 0.05,
   "hfov": 17.85
  }
 ],
 "id": "overlay_E931FF5C_E6ED_D826_41E1_CA0864D785E1",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA, this.camera_13E17C74_0618_A612_418C_73B0BCFEC5A5); this.mainPlayList.set('selectedIndex', 20)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -80.93,
   "hfov": 7.85,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C8E759F9_C391_88AE_41D0_5C4EF78B7034_1_HS_0_0_0_map.gif",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": -46.66
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_EE94D51C_C634_79C1_41DC_732DA7699835",
   "yaw": -80.93,
   "pitch": -46.66,
   "distance": 100,
   "hfov": 7.85
  }
 ],
 "id": "overlay_D6A133C2_C634_D841_41E3_3F1875A05CAD",
 "data": {
  "label": "Arrow 01"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C845D458_C38F_7FEE_41AF_209B05ABC3B4, this.camera_13C34C65_0618_A632_4196_33761D0F249A); this.mainPlayList.set('selectedIndex', 15)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 37.66,
   "hfov": 10.86,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C8E759F9_C391_88AE_41D0_5C4EF78B7034_1_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 2.2
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "yaw": 37.66,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C8E759F9_C391_88AE_41D0_5C4EF78B7034_1_HS_1_0.png",
      "width": 150,
      "height": 150
     }
    ]
   },
   "pitch": 2.2,
   "hfov": 10.86
  }
 ],
 "id": "overlay_D78B856A_C635_D841_41D8_38F24CF45E90",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C845D458_C38F_7FEE_41AF_209B05ABC3B4, this.camera_13D27C6C_0618_A632_4192_A702A9AD8D80); this.mainPlayList.set('selectedIndex', 15)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -4.32,
   "hfov": 12.16,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C8E759F9_C391_88AE_41D0_5C4EF78B7034_1_HS_2_0_0_map.gif",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -22.06
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_EE95A51C_C634_79C1_41E7_4B60BD608A25",
   "yaw": -4.32,
   "pitch": -22.06,
   "distance": 100,
   "hfov": 12.16
  }
 ],
 "id": "overlay_D6DCC2CE_C634_F841_41DB_C74AF57B3D08",
 "data": {
  "label": "Circle 01a"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C8E07E20_C390_8B5D_41D7_DBEAC9716594, this.camera_12D44B92_0618_A216_4198_0B904FB347A9); this.mainPlayList.set('selectedIndex', 46)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 127.47,
   "hfov": 13.53,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C8E1F231_C38F_9BBF_41C7_8B73F57AA26D_1_HS_0_0_0_map.gif",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -31.53
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_EE9B5530_C634_79C1_41B4_11C1132B83F0",
   "yaw": 127.47,
   "pitch": -31.53,
   "distance": 100,
   "hfov": 13.53
  }
 ],
 "id": "overlay_DDAC91FB_C64C_3847_41DE_4E8AC2FC381D",
 "data": {
  "label": "Circle 01a"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C8E84376_C391_79A5_41A5_D6230668BC5C, this.camera_12E84B9B_0618_A216_4166_A5AB7FA6514C); this.mainPlayList.set('selectedIndex', 49)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 6.08,
   "hfov": 13.42,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C8E1F231_C38F_9BBF_41C7_8B73F57AA26D_1_HS_1_0_0_map.gif",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -19.3
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_EE98C530_C634_79C1_41E2_5F0839D67BE3",
   "yaw": 6.08,
   "pitch": -19.3,
   "distance": 100,
   "hfov": 13.42
  }
 ],
 "id": "overlay_DA2CFE08_C64C_4BC1_41C2_4C4C28E16DA7",
 "data": {
  "label": "Circle 01a"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_0F2964AA_0199_39D8_415C_DAB75F704D09, this.camera_11D9BB49_0618_A273_4177_A20834322267); this.mainPlayList.set('selectedIndex', 48)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -55.69,
   "hfov": 10.87,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C8E1F231_C38F_9BBF_41C7_8B73F57AA26D_1_HS_2_0_0_map.gif",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 0
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "yaw": -55.69,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C8E1F231_C38F_9BBF_41C7_8B73F57AA26D_1_HS_2_0.png",
      "width": 150,
      "height": 150
     }
    ]
   },
   "pitch": 0,
   "hfov": 10.87
  }
 ],
 "id": "overlay_13150BDB_01A7_0F78_4176_E70CD73338D4",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5, this.camera_13FE2C7C_0618_A612_4191_6FC3F20E8DB1); this.mainPlayList.set('selectedIndex', 24)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 75.99,
   "hfov": 12.22,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9_1_HS_0_0_0_map.gif",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -51.06
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_EE93D51E_C634_79C1_4199_FCDDF2FE4CA6",
   "yaw": 75.99,
   "pitch": -51.06,
   "distance": 100,
   "hfov": 12.22
  }
 ],
 "id": "overlay_D55AF350_C65C_5841_41E8_2583A752FBE8",
 "data": {
  "label": "Circle 01a"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_11B27642_004A_EB3A_4142_7CBC8EFC0A22, this.camera_138D3C83_0618_A6F6_418C_0AC25EFA8850); this.mainPlayList.set('selectedIndex', 26)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 118.11,
   "hfov": 10.86,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9_0_HS_2_0_0_map.gif",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 2.84
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "yaw": 118.11,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9_0_HS_2_0.png",
      "width": 151,
      "height": 151
     }
    ]
   },
   "pitch": 2.84,
   "hfov": 10.86
  }
 ],
 "id": "overlay_1788E5E3_0609_A636_4170_98106BB92308",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 10)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 84.77,
   "hfov": 12.22,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A_1_HS_0_0_0_map.gif",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -51.06
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_EE84853A_C634_79C1_41DD_0215F77B0541",
   "yaw": 84.77,
   "pitch": -51.06,
   "distance": 100,
   "hfov": 12.22
  }
 ],
 "id": "overlay_E483FB4F_C654_C85F_41D6_EB69928269D3",
 "data": {
  "label": "Circle 01a"
 },
 "rollOverDisplay": false
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_118A5E95_004A_FB5E_414F_25F73E14E9E4, this.camera_12F8DBB5_0618_A212_4183_892946718C2A); this.mainPlayList.set('selectedIndex', 56)"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 117.73,
   "hfov": 11.12,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A_0_HS_2_0_0_map.gif",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -0.55
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "yaw": 117.73,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A_0_HS_2_0.png",
      "width": 154,
      "height": 161
     }
    ]
   },
   "pitch": -0.55,
   "hfov": 11.12
  }
 ],
 "id": "overlay_15B8B6A2_0608_E231_4196_4E1A0E5B8274",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false
},
{
 "frameDuration": 41,
 "id": "AnimatedImageResource_EE9BB528_C634_79C1_41B3_1F353BE8FDD6",
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_1_HS_1_0.png",
   "width": 1080,
   "height": 750
  }
 ],
 "rowCount": 5
},
{
 "frameDuration": 41,
 "id": "AnimatedImageResource_EE861538_C634_79C1_41E5_D5BEC86A2DD1",
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D_1_HS_0_0.png",
   "width": 1080,
   "height": 750
  }
 ],
 "rowCount": 5
},
{
 "frameDuration": 41,
 "id": "AnimatedImageResource_EE9AE527_C634_79CF_41CB_542FF5E39B28",
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5_1_HS_0_0.png",
   "width": 1080,
   "height": 750
  }
 ],
 "rowCount": 5
},
{
 "frameDuration": 41,
 "id": "AnimatedImageResource_EE96A517_C634_79CF_41BB_38AC08D7DC61",
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_1_HS_1_0.png",
   "width": 1080,
   "height": 750
  }
 ],
 "rowCount": 5
},
{
 "frameDuration": 41,
 "id": "AnimatedImageResource_EE868537_C634_79CF_41DE_C101E360270A",
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_1_HS_1_0.png",
   "width": 1080,
   "height": 750
  }
 ],
 "rowCount": 5
},
{
 "frameDuration": 41,
 "id": "AnimatedImageResource_EE9C0525_C634_79C3_41E5_176E60E12F40",
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_1_HS_1_0.png",
   "width": 1080,
   "height": 750
  }
 ],
 "rowCount": 5
},
{
 "frameDuration": 41,
 "id": "AnimatedImageResource_EE99E532_C634_79C1_41D6_1B017FB56B5D",
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_C8E07E20_C390_8B5D_41D7_DBEAC9716594_1_HS_1_0.png",
   "width": 1080,
   "height": 750
  }
 ],
 "rowCount": 5
},
{
 "frameDuration": 62,
 "id": "AnimatedImageResource_EE98B533_C634_79C7_41CE_E8F5D45B1A6B",
 "colCount": 3,
 "class": "AnimatedImageResource",
 "frameCount": 9,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_C8E07E20_C390_8B5D_41D7_DBEAC9716594_1_HS_2_0.png",
   "width": 300,
   "height": 300
  }
 ],
 "rowCount": 3
},
{
 "frameDuration": 41,
 "id": "AnimatedImageResource_EE9B3529_C634_79C3_41E2_6373077866CD",
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6_1_HS_0_0.png",
   "width": 1080,
   "height": 750
  }
 ],
 "rowCount": 5
},
{
 "frameDuration": 41,
 "id": "AnimatedImageResource_EE92B51D_C634_79C3_41E6_BF230F987FF4",
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_1_HS_1_0.png",
   "width": 1080,
   "height": 750
  }
 ],
 "rowCount": 5
},
{
 "frameDuration": 41,
 "id": "AnimatedImageResource_EE94B519_C634_79C3_41E2_987DBE2A3C20",
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4_1_HS_0_0.png",
   "width": 1080,
   "height": 750
  }
 ],
 "rowCount": 5
},
{
 "frameDuration": 62,
 "id": "AnimatedImageResource_EE9E7522_C634_79C1_41D2_BDC23086CB3A",
 "colCount": 3,
 "class": "AnimatedImageResource",
 "frameCount": 9,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_C8E8EEF1_C391_88BE_41E1_593F441770DA_1_HS_0_0.png",
   "width": 300,
   "height": 270
  }
 ],
 "rowCount": 3
},
{
 "frameDuration": 41,
 "id": "AnimatedImageResource_EE9FE523_C634_79C7_41DF_1F6FC3B5DE01",
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_C8E8EEF1_C391_88BE_41E1_593F441770DA_1_HS_1_0.png",
   "width": 1080,
   "height": 750
  }
 ],
 "rowCount": 5
},
{
 "frameDuration": 41,
 "id": "AnimatedImageResource_EE93A51E_C634_79C1_41E1_1FE79DE4D4E8",
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_1_HS_1_0.png",
   "width": 1080,
   "height": 750
  }
 ],
 "rowCount": 5
},
{
 "frameDuration": 41,
 "id": "AnimatedImageResource_EE85E53C_C634_79C1_41DB_7F3562B22FD2",
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA_1_HS_0_0.png",
   "width": 1080,
   "height": 750
  }
 ],
 "rowCount": 5
},
{
 "frameDuration": 62,
 "id": "AnimatedImageResource_EEA93516_C634_79C1_41D5_E7DFC2676D36",
 "colCount": 3,
 "class": "AnimatedImageResource",
 "frameCount": 9,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_CF1013BA_C391_98A2_4167_0505D502E364_1_HS_0_0.png",
   "width": 300,
   "height": 270
  }
 ],
 "rowCount": 3
},
{
 "frameDuration": 41,
 "id": "AnimatedImageResource_EEAB6513_C634_79C7_41C5_016AAFA35151",
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_C8443AAC_C390_88A6_41E1_B9756BC8A56B_1_HS_0_0.png",
   "width": 1080,
   "height": 750
  }
 ],
 "rowCount": 5
},
{
 "frameDuration": 62,
 "id": "AnimatedImageResource_EEA8F514_C634_79C1_41D2_016258F6485B",
 "colCount": 3,
 "class": "AnimatedImageResource",
 "frameCount": 9,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_C8443AAC_C390_88A6_41E1_B9756BC8A56B_1_HS_2_0.png",
   "width": 300,
   "height": 300
  }
 ],
 "rowCount": 3
},
{
 "frameDuration": 41,
 "id": "AnimatedImageResource_EE96F517_C634_79CF_41DD_B98B1CDAC4EF",
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23_1_HS_0_0.png",
   "width": 1080,
   "height": 750
  }
 ],
 "rowCount": 5
},
{
 "frameDuration": 41,
 "id": "AnimatedImageResource_EE973518_C634_79C1_41B1_D4F6FE4DD0CE",
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_1_HS_0_0.png",
   "width": 1080,
   "height": 750
  }
 ],
 "rowCount": 5
},
{
 "frameDuration": 41,
 "id": "AnimatedImageResource_EE9EA521_C634_79C3_41CB_87B2F5C5B2E2",
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_C8E097E2_C390_F8A2_419E_45918FB20A48_1_HS_1_0.png",
   "width": 1080,
   "height": 750
  }
 ],
 "rowCount": 5
},
{
 "frameDuration": 62,
 "id": "AnimatedImageResource_EE9E2522_C634_79C1_41C5_07C0CEC09C22",
 "colCount": 3,
 "class": "AnimatedImageResource",
 "frameCount": 9,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_C8E097E2_C390_F8A2_419E_45918FB20A48_1_HS_2_0.png",
   "width": 300,
   "height": 300
  }
 ],
 "rowCount": 3
},
{
 "frameDuration": 62,
 "id": "AnimatedImageResource_EE85753D_C634_79C3_41D0_D071D6C1482E",
 "colCount": 3,
 "class": "AnimatedImageResource",
 "frameCount": 9,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_E609D5D6_C65C_5841_41DC_4408506ECD34_1_HS_0_0.png",
   "width": 300,
   "height": 270
  }
 ],
 "rowCount": 3
},
{
 "frameDuration": 41,
 "id": "AnimatedImageResource_EE90B51F_C634_79FF_41C5_A79C01C84446",
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_1_HS_1_0.png",
   "width": 1080,
   "height": 750
  }
 ],
 "rowCount": 5
},
{
 "frameDuration": 41,
 "id": "AnimatedImageResource_EE9D8526_C634_79C1_41D1_BFDADEF90055",
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5_1_HS_0_0.png",
   "width": 1080,
   "height": 750
  }
 ],
 "rowCount": 5
},
{
 "frameDuration": 41,
 "id": "AnimatedImageResource_EE95B51A_C634_79C1_41AA_C27846BCCE73",
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_C8E03182_C390_F962_41E3_AA944CB11FB1_1_HS_0_0.png",
   "width": 1080,
   "height": 750
  }
 ],
 "rowCount": 5
},
{
 "frameDuration": 62,
 "id": "AnimatedImageResource_EE94B51B_C634_79C7_41E7_DF3C12E87276",
 "colCount": 3,
 "class": "AnimatedImageResource",
 "frameCount": 9,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_C8E03182_C390_F962_41E3_AA944CB11FB1_1_HS_2_0.png",
   "width": 300,
   "height": 300
  }
 ],
 "rowCount": 3
},
{
 "frameDuration": 41,
 "id": "AnimatedImageResource_EE872539_C634_79C3_41C0_5F139E4D450B",
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_1_HS_1_0.png",
   "width": 1080,
   "height": 750
  }
 ],
 "rowCount": 5
},
{
 "frameDuration": 41,
 "id": "AnimatedImageResource_EE904520_C634_79C1_41D2_C80236AFDEAF",
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_C8E21D8B_C38F_8962_41E8_4ED88E72A8E4_1_HS_0_0.png",
   "width": 1080,
   "height": 750
  }
 ],
 "rowCount": 5
},
{
 "frameDuration": 41,
 "id": "AnimatedImageResource_EE91C521_C634_79C3_41CC_F17162481F82",
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_C8E21D8B_C38F_8962_41E8_4ED88E72A8E4_1_HS_1_0.png",
   "width": 1080,
   "height": 750
  }
 ],
 "rowCount": 5
},
{
 "frameDuration": 41,
 "id": "AnimatedImageResource_EE9D7527_C634_79CF_41D8_0EE7C8EAC465",
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_1_HS_1_0.png",
   "width": 1080,
   "height": 750
  }
 ],
 "rowCount": 5
},
{
 "frameDuration": 41,
 "id": "AnimatedImageResource_EE92251D_C634_79C3_41D0_BCD536C9B445",
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2_1_HS_0_0.png",
   "width": 1080,
   "height": 750
  }
 ],
 "rowCount": 5
},
{
 "frameDuration": 41,
 "id": "AnimatedImageResource_EE902520_C634_79C1_41BF_257FBF304234",
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D_1_HS_0_0.png",
   "width": 1080,
   "height": 750
  }
 ],
 "rowCount": 5
},
{
 "frameDuration": 41,
 "id": "AnimatedImageResource_EE84253B_C634_79C7_41E0_968E01AFCA33",
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_1_HS_0_0.png",
   "width": 1080,
   "height": 750
  }
 ],
 "rowCount": 5
},
{
 "frameDuration": 41,
 "id": "AnimatedImageResource_EE978518_C634_79C1_41BF_08456E54B1D1",
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40_1_HS_0_0.png",
   "width": 1080,
   "height": 750
  }
 ],
 "rowCount": 5
},
{
 "frameDuration": 62,
 "id": "AnimatedImageResource_EE95D51C_C634_79C1_41D1_15DF599FD598",
 "colCount": 3,
 "class": "AnimatedImageResource",
 "frameCount": 9,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA_1_HS_0_0.png",
   "width": 300,
   "height": 270
  }
 ],
 "rowCount": 3
},
{
 "frameDuration": 41,
 "id": "AnimatedImageResource_EE94F519_C634_79C3_41E7_CF7F35AA8B57",
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_C845D458_C38F_7FEE_41AF_209B05ABC3B4_1_HS_0_0.png",
   "width": 1080,
   "height": 750
  }
 ],
 "rowCount": 5
},
{
 "frameDuration": 41,
 "id": "AnimatedImageResource_EE94651A_C634_79C1_41C0_7213AD55ED9D",
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_C845D458_C38F_7FEE_41AF_209B05ABC3B4_1_HS_1_0.png",
   "width": 1080,
   "height": 750
  }
 ],
 "rowCount": 5
},
{
 "frameDuration": 62,
 "id": "AnimatedImageResource_EE982534_C634_79C1_41B1_FCE0D32794A2",
 "colCount": 3,
 "class": "AnimatedImageResource",
 "frameCount": 9,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_C8E84376_C391_79A5_41A5_D6230668BC5C_1_HS_0_0.png",
   "width": 300,
   "height": 270
  }
 ],
 "rowCount": 3
},
{
 "frameDuration": 41,
 "id": "AnimatedImageResource_EE992535_C634_79C3_41CC_0F82C39BF420",
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_C8E84376_C391_79A5_41A5_D6230668BC5C_1_HS_2_0.png",
   "width": 1080,
   "height": 750
  }
 ],
 "rowCount": 5
},
{
 "frameDuration": 62,
 "id": "AnimatedImageResource_EE9F5524_C634_79C1_4151_C56E80BD365E",
 "colCount": 3,
 "class": "AnimatedImageResource",
 "frameCount": 9,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9_1_HS_0_0.png",
   "width": 300,
   "height": 270
  }
 ],
 "rowCount": 3
},
{
 "frameDuration": 41,
 "id": "AnimatedImageResource_EEA83515_C634_79C3_41D3_CD95A4DC902C",
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_1_HS_0_0.png",
   "width": 1080,
   "height": 750
  }
 ],
 "rowCount": 5
},
{
 "frameDuration": 62,
 "id": "AnimatedImageResource_EEA85515_C634_79C3_41E0_6091C7CEDAF8",
 "colCount": 3,
 "class": "AnimatedImageResource",
 "frameCount": 9,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_1_HS_1_0.png",
   "width": 300,
   "height": 270
  }
 ],
 "rowCount": 3
},
{
 "frameDuration": 41,
 "id": "AnimatedImageResource_EEAAA508_C634_79C1_41D8_AB01FEA3A2FF",
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_C8E22910_C38F_897E_41BD_C3761AC35EAF_1_HS_0_0.png",
   "width": 1080,
   "height": 750
  }
 ],
 "rowCount": 5
},
{
 "frameDuration": 41,
 "id": "AnimatedImageResource_EEAB0513_C634_79C7_41E1_6DABE2DBB8E8",
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_C8E22910_C38F_897E_41BD_C3761AC35EAF_1_HS_1_0.png",
   "width": 1080,
   "height": 750
  }
 ],
 "rowCount": 5
},
{
 "frameDuration": 41,
 "id": "AnimatedImageResource_EE960517_C634_79CE_41A3_AD59E10D5AB0",
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_1_HS_0_0.png",
   "width": 1080,
   "height": 750
  }
 ],
 "rowCount": 5
},
{
 "frameDuration": 62,
 "id": "AnimatedImageResource_EE94D51C_C634_79C1_41DC_732DA7699835",
 "colCount": 3,
 "class": "AnimatedImageResource",
 "frameCount": 9,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_C8E759F9_C391_88AE_41D0_5C4EF78B7034_1_HS_0_0.png",
   "width": 300,
   "height": 270
  }
 ],
 "rowCount": 3
},
{
 "frameDuration": 41,
 "id": "AnimatedImageResource_EE95A51C_C634_79C1_41E7_4B60BD608A25",
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_C8E759F9_C391_88AE_41D0_5C4EF78B7034_1_HS_2_0.png",
   "width": 1080,
   "height": 750
  }
 ],
 "rowCount": 5
},
{
 "frameDuration": 41,
 "id": "AnimatedImageResource_EE9B5530_C634_79C1_41B4_11C1132B83F0",
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_C8E1F231_C38F_9BBF_41C7_8B73F57AA26D_1_HS_0_0.png",
   "width": 1080,
   "height": 750
  }
 ],
 "rowCount": 5
},
{
 "frameDuration": 41,
 "id": "AnimatedImageResource_EE98C530_C634_79C1_41E2_5F0839D67BE3",
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_C8E1F231_C38F_9BBF_41C7_8B73F57AA26D_1_HS_1_0.png",
   "width": 1080,
   "height": 750
  }
 ],
 "rowCount": 5
},
{
 "frameDuration": 41,
 "id": "AnimatedImageResource_EE93D51E_C634_79C1_4199_FCDDF2FE4CA6",
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9_1_HS_0_0.png",
   "width": 1080,
   "height": 750
  }
 ],
 "rowCount": 5
},
{
 "frameDuration": 41,
 "id": "AnimatedImageResource_EE84853A_C634_79C1_41DD_0215F77B0541",
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A_1_HS_0_0.png",
   "width": 1080,
   "height": 750
  }
 ],
 "rowCount": 5
}],
 "desktopMipmappingEnabled": false,
 "mobileMipmappingEnabled": false,
 "scrollBarColor": "#000000",
 "minWidth": 20,
 "scrollBarVisible": "rollOver",
 "class": "Player",
 "horizontalAlign": "left",
 "gap": 10,
 "vrPolyfillScale": 0.5,
 "scrollBarOpacity": 0.5,
 "overflow": "visible",
 "scrollBarMargin": 2,
 "height": "100%",
 "contentOpaque": false,
 "paddingTop": 0,
 "data": {
  "name": "Player1235"
 },
 "mouseWheelEnabled": true,
 "shadow": false,
 "layout": "absolute",
 "downloadEnabled": false,
 "defaultVRPointer": "laser",
 "scripts": {
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "registerKey": function(key, value){  window[key] = value; },
  "getKey": function(key){  return window[key]; },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "unregisterKey": function(key){  delete window[key]; },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "existsKey": function(key){  return key in window; },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); }
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
