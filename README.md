# videoPlayer

Key functionalities: 

- play video
- pause video
- stop video (goes to the first item in the playlist and displays a poster)
- displays state of the player (PLAYING, PAUSED or STOPPED)
- repeat playlist
- shuffle playlist
- fullscreen
- load playlist from a JSON file. File should be placed in the playlist folder, files should be placed in the samples folder. Example:

{
  "playlist": [{"url": "samples/sample1.mp4"},
      {"url": "samples/sample5.mp4"},
      {"url": "samples/sample4.mp4"},
      {"url": "samples/sample3.mp4"},
      {"url": "samples/sample2.mp4"}
  ]
}
