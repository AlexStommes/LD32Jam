/*
 * The `assets` module
 * ============================================================================
 *
 * Use this module to declare static Phaser Asset Packs, that would be loaded
 * using the `Loader#pack` API.
 */


export default {

  // - Boot Assets ------------------------------------------------------------
  'boot': [
    {
      key: 'splash-screen',
      type: 'image',
      url: 'splash-screen.png'
    },

    {
      key: 'progress-bar',
      type: 'image',
      url: 'progress-bar.png'
    }
  ],

  // - Game assets ------------------------------------------------------------
  'game': [
    {
      key: 'phaser',
      type: 'image',
      url: 'phaser.png'
    },
    {
      'key': 'player',
      'type': 'atlasJSONHash',
      'atlasURL': 'player_animated2.json',
      'textureURL': 'player_animated2.png'
    },
    {
      'key': 'trash',
      'type': 'atlasJSONHash',
      'atlasURL': 'trash.json',
      'textureURL': 'trash.png'
    },
    {
      'key': 'wave',
      'type': 'image',
      'url': 'ocean_waves.png'
    },
    {
      'key': 'floorTile',
      'type': 'image',
      'url': 'ocean_floor.png'
    },
    {
      'key': 'ship',
      'type': 'image',
      'url': 'boat01.png'
    }
  ],

  // - Music and Sound effects ------------------------------------------------
  'audio': [
    // ...
  ]

};
