import React, {
  ChangeEvent,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import screenfull from "screenfull";
import Store from "../../utils/Store";
import { AnimeInfo, Source } from "../../utils/type";
import { Spinner } from "../lazyLoading/lazyLoading";

interface propVideo {
  info? : AnimeInfo,
  source?: Source
}

const VideoPlayer = ({ source,info }: propVideo) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress_bar, setProgress_bar] = useState(0);
  const [playing, setPlaying] = useState(false);  const [stateVolum, setStateVolume] = useState<string>(
    "volume_up" || "volume_down" || "volume_off"
  );
  const [valueVolume, setValueVolume] = useState(80);
  const [timeShow, setTimeShow] = useState<string>("0:00");
  const [canPlay,setCanPlay] = useState(false)
  const mainVideoRef = useRef<HTMLVideoElement | null>(null);
  const videoPlayerRef = useRef<HTMLDivElement | null>(null);
  const progressAreatime = useRef<HTMLDivElement | null>(null);
  const fullScreen = useRef<HTMLLIElement | null>(null);
  const progressArea = useRef<HTMLDivElement | null>(null);
  const play_pause = useRef<HTMLLIElement | null>(null);
  const volume_range = useRef<HTMLInputElement | null>(null);
  const refContainer = useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    if(mainVideoRef.current){
      mainVideoRef.current.src = source?.videoSource!
      mainVideoRef?.current!.pause();
      play_pause.current!.innerHTML = "play_arrow";
      play_pause.current!.title = "play";
      setPlaying(false);
      console.log(source?.videoSource)
    }
  },[source?.videoSource])
  
  const handleVideo = () => {
    if (playing) {
      mainVideoRef?.current!.pause();
      setPlaying(false);
      play_pause.current!.innerHTML = "play_arrow";
      play_pause.current!.title = "play";
    } else {
      mainVideoRef?.current!.play();
      play_pause.current!.innerHTML = "pause";
      play_pause.current!.title = "pause";
      setPlaying(true);
    }
  };

  const handleMoveOver = () => {
    videoPlayerRef.current?.children[2].classList.add("active");
  };
  const handleMoveLeave = () => {
    if (playing) {
      if (videoPlayerRef.current?.children[3].classList.contains("active")) {
        videoPlayerRef.current?.children[2].classList.add("active");
      } else {
        videoPlayerRef.current?.children[2].classList.remove("active");
      }
    } else {
      videoPlayerRef.current?.children[2].classList.add("active");
    }
  };

  const convetTime = (time: any) => {
    let totalMin = Math.floor(time / 60);
    let totalSec = Math.floor(time % 60);
    let sec = totalSec < 10 ? "0" + totalSec : totalSec;
    let min = totalMin < 10 ? "0" + totalMin : totalMin;
    return `${min} : ${sec}`;
  };
  const timeUpdate = (e: SyntheticEvent<HTMLVideoElement>) => {
    const currentTimeVideo = e.currentTarget.currentTime;
    setCurrentTime(currentTimeVideo);
    const videoDuration = e.currentTarget.duration;
    let progressWidth = (currentTimeVideo / videoDuration) * 100;
    setProgress_bar(progressWidth);
  };
  const changTime = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    let vidoeDuration = mainVideoRef.current!.duration;
    let progressWith = progressArea.current!.getBoundingClientRect().width;
    let clickOffset = e.nativeEvent.offsetX;

    mainVideoRef.current!.currentTime =
      (clickOffset / progressWith) * vidoeDuration;
      setCanPlay(false)
  };
  const changeVolume = (e: ChangeEvent<HTMLInputElement>) => {
    if (valueVolume === 0) {
      setStateVolume("volume_off");
    } else if (valueVolume < 40) {
      setStateVolume("volume_down");
    } else {
      setStateVolume("volume_up");
    }

    setValueVolume(parseInt(e.target.value));
    mainVideoRef.current!.volume = valueVolume / 100;
  };
  const showTimeHover = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    let progressWith = progressArea.current!.getBoundingClientRect().width;
    let x = e.nativeEvent.offsetX;

    progressAreatime.current?.style.setProperty("--x", `${x}px`);
    progressAreatime.current?.style.setProperty("display", "block");

    let videoDuration = mainVideoRef.current!.duration;
    let progressTime = Math.floor((x / progressWith) * videoDuration);
    let Min = Math.floor(progressTime / 60);
    let sec = Math.floor(progressTime % 60);

    let currentMin = Min < 10 ? "0" + Min : Min;
    let currentSec = sec < 10 ? "0" + sec : sec;
    setTimeShow(`${currentMin} : ${currentSec}`);
  };
  const offTimeHover = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    progressAreatime.current?.style.setProperty("display", "none");
  };
  const PictureinPicture = () => {
    mainVideoRef.current?.requestPictureInPicture();
  };
  const toggleFullScreen = () => {
    if (refContainer.current) {
      screenfull.toggle(refContainer.current);
    }
  };
  
  const storeVideo = ()=> {
    const {thumbnail, ...rest } = info!;
   
    Store.update(
      "recent",
      { id: info?.id },
      {
        ...rest,
        thumbnail: source?.thumbnail_medium,
        time: source!.full_name,
      }
    );   
   
  }

  return (
    <div className="container" ref={refContainer}>
      <div
        id="video_player"
        ref={videoPlayerRef}
        onMouseOver={handleMoveOver}
        onMouseLeave={handleMoveLeave}
      >
        <video
          preload="none"
          id="main-video"
          ref={mainVideoRef}
          onClick={handleVideo}
          onLoadStart={storeVideo}
          onError = {() => console.log("error")}
          onSuspend = {() => console.log("onSuspend")}
          onWaiting = {() =>setCanPlay(false)}
          onCanPlay={()=> setCanPlay(true)}
          onTimeUpdate={(e) => timeUpdate(e)}
          onLoadedData={(e) => {
            setDuration(e.currentTarget.duration)
          } }
          playsInline>
          <source  src={`${source?.videoSource}`} type="video/mp4" />
        </video>
             
        <div className="progressAreaTime" ref={progressAreatime}>
          {timeShow}
        </div>
        <div className="controls">
          <div
            className="progress-area"
            ref={progressArea}
            onMouseMove={(e) => showTimeHover(e)}
            onMouseLeave={(e) => offTimeHover(e)}
            onClick={(e) => changTime(e)}
          >
            <div className="progress-bar" style={{ width: `${progress_bar}%` }}>
              <span></span>
            </div>
          </div>
          <div className="controls-list">
          
            <div className="controls-left">
              <span className="icons">
                <i
                  onClick={() => (mainVideoRef.current!.currentTime -= 10)}
                  className="material-icons fast-rewind"
                >
                  {" "}
                  replay_10{" "}
                </i>
              </span>
              <span className="icons">
                <i
                  ref={play_pause}
                  onClick={handleVideo}
                  className="material-icons play_pause"
                >
                  {" "}
                  play_arrow{" "}
                </i>
              </span>
              <span className="icons">
                <i
                  onClick={() => (mainVideoRef.current!.currentTime += 10)}
                  className="material-icons fast-forward"
                >
                  {" "}
                  forward_10{" "}
                </i>
              </span>
              <span className="icons">
                <i className="material-icons volume"> {stateVolum} </i>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={valueVolume}
                  className="volume_range"
                  ref={volume_range}
                  onChange={(e) => changeVolume(e)}
                />
              </span>
              <div className="timer">
                <span className="current">{convetTime(currentTime)}</span>/
                <span className="duration">{convetTime(duration)}</span>
              </div>
            </div>

            <div className="controls-right">
              <span className="icons">
                <i className="material-icons auto-play"> </i>
              </span>
              <span className="icons">
                <i className="material-icons settingsBtn"> settings </i>
              </span>
              <span className="icons">
                <i
                  className="material-icons picture_in_picture"
                  onClick={PictureinPicture}
                >
                  picture_in_picture_alt
                </i>
              </span>
              <span className="icons">
                <i
                  className="material-icons fullscreen"
                  ref={fullScreen}
                  onClick={() => toggleFullScreen()}
                >
                  {" "}
                  fullscreen{" "}
                </i>
              </span>
            </div>
          </div>
        </div>
        <div id="settings">
          <div className="playback">
            <span>Playback Speed</span>
            <ul>
              <li data-speed="0.25">0.25</li>
              <li data-speed="0.5">0.5</li>
              <li data-speed="0.75">0.75</li>
              <li data-speed="1" className="active">
                1
              </li>
              <li data-speed="1.25">1.25</li>
              <li data-speed="1.5">1.5</li>
              <li data-speed="1.75">1.75</li>
            </ul>
          </div>
        </div>
        <div className="wait-video-can-play" style={{display : canPlay ? 'none' : 'flex'}}>
          <img src="https://cutewallpaper.org/21/loading-gif-transparent-background/Tag-For-Loading-Bar-Gif-Transparent-Loading-Gif-.gif" />
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer
