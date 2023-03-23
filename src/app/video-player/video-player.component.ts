import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import * as shaka from 'shaka-player';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css'],
})
export class VideoPlayerComponent implements AfterViewInit {
  @ViewChild('videoPlayer') videoElementRef: ElementRef;
  videoElement: HTMLVideoElement;

  manifestUri =
    'https://stream.broadpeak.io/17c276c8e723eb462cf7dc51634157b8/flm-gcp-lab-live/live/ch1-blmbrg/main.m3u8';

  ngAfterViewInit() {
    // Install built-in polyfills to patch browser incompatibilities.
    shaka.polyfill.installAll();

    // Check to see if the browser supports the basic APIs Shaka needs.
    if (shaka.Player.isBrowserSupported()) {
      // Everything looks good!
      this.videoElement = this.videoElementRef.nativeElement;
      this.initPlayer();
      console.log('Everything looks good! The video has now been loaded!');
    } else {
      // This browser does not have the minimum set of APIs we need.
      console.error('Browser not supported!');
    }
  }

  private initPlayer() {
    // Create a Player instance.
    // var video = document.getElementById('video');
    let player = new shaka.Player(this.videoElementRef.nativeElement);

    // Attach player to the window to make it easy to access in the JS console.
    // window.player = player;

    // Listen for error events.
    player.addEventListener('error', this.onErrorEvent);

    // Try to load a manifest.
    // This is an asynchronous process.
    player
      .load(this.manifestUri)
      .then(() => {
        // This runs if the asynchronous load is successful.
        console.log('The video has now been loaded!');
      })
      .catch(this.onError); // onError is executed if the asynchronous load fails.
  }

  private onErrorEvent(event) {
    // Extract the shaka.util.Error object from the event.
    this.onError(event.detail);
  }

  private onError(error) {
    // Log the error.
    console.error('Error code', error.code, 'object', error);
  }
}
