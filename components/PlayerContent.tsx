import { useEffect, useRef, useState } from "react";
import { BsArrowDown, BsPauseFill, BsPlayFill } from "react-icons/bs";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";

import { Song } from "@/types";
import usePlayer from "@/hooks/usePlayer";

import LikeButton from "./LikeButton";
import MediaItem from "./MediaItem";
import Slider from "./Slider";
import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";

import useUploadModal from "@/hooks/useUploadModal";
import { useUser } from "@/hooks/useUser";
import useAuthModal from "@/hooks/useAuthModal";
import useSubscribeModal from "@/hooks/useSubscribeModal";

interface PlayerContentProps {
  song: Song;
  songUrl: string;
}

const PlayerContent: React.FC<PlayerContentProps> = ({ song, songUrl }) => {
  const player = usePlayer();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const { user, subscription } = useUser();
  const uploadModal = useUploadModal();
  const authModal = useAuthModal();
  const subscribeModal = useSubscribeModal();

  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  const onPlayNext = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const nextSong = player.ids[currentIndex + 1];

    if (!nextSong) {
      return player.setId(player.ids[0]);
    }

    player.setId(nextSong);
  };

  const onPlayPrevious = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const previousSong = player.ids[currentIndex - 1];

    if (!previousSong) {
      return player.setId(player.ids[player.ids.length - 1]);
    }

    player.setId(previousSong);
  };

  const handlePlay = () => {
    if (!isPlaying) {
      audioRef.current?.play();
      setIsPlaying(true);
    } else {
      audioRef.current?.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const newVolume = volume === 0 ? 1 : 0;
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleDownload = () => {
    if (!subscription) {
      return subscribeModal.onOpen();
    }
    const link = document.createElement("a");
    link.href = songUrl;
    link.download = `${song.title}.mp3`;

    link.click();
  };

  const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(event.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      const audio = audioRef.current;

      const updateCurrentTime = () => {
        setCurrentTime(audio.currentTime);
      };

      const setAudioData = () => {
        setDuration(audio.duration);
        setCurrentTime(audio.currentTime);
      };

      const handleEnded = () => {
        onPlayNext();
      };

      audio.addEventListener("loadeddata", setAudioData);
      audio.addEventListener("timeupdate", updateCurrentTime);
      audio.addEventListener("ended", handleEnded);

      return () => {
        audio.removeEventListener("loadeddata", setAudioData);
        audio.removeEventListener("timeupdate", updateCurrentTime);
        audio.removeEventListener("ended", handleEnded);
      };
    }
  }, [songUrl]);

  // Add this useEffect to play the song automatically when songUrl changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [songUrl]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 h-full">
      <audio ref={audioRef} src={songUrl} preload="metadata" />
      <div className="flex w-full justify-start">
        <div className="flex items-center gap-x-4">
          <MediaItem data={song} />
          <LikeButton songId={song.id} />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="w-full flex gap-4 align-middle">
          <div className="flex justify-between text-sm mt-1">
            <span>{formatTime(currentTime)}</span>
          </div>
          <input
            type="range"
            min={0}
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            step={0.01}
            color="red"
            style={{
              color: "white",
              backgroundColor: "white",
              width: "100%",
              height: "4px",
              marginTop: "10px",
              cursor: "pointer",
            }}
          />
          <div className="flex justify-between text-sm mt-1">
            <span>{formatTime(duration)}</span>
          </div>
        </div>
        <div className="md:flex w-full justify-center items-center mr-1 gap-2">
          <AiFillStepBackward
            onClick={onPlayPrevious}
            size={30}
            className="text-neutral-400 cursor-pointer hover:text-white transition"
          />
          <div
            onClick={handlePlay}
            className="flex items-center justify-center h-10 w-10 rounded-full bg-white p-1 cursor-pointer"
          >
            <Icon size={30} className="text-black" />
          </div>
          <AiFillStepForward
            onClick={onPlayNext}
            size={30}
            className="text-neutral-400 cursor-pointer hover:text-white transition"
          />
        </div>
      </div>
      <div className="md:flex w-72 ml-56 gap-6  justify-end pr-2">
        <div className="flex w-56 cursor-pointer">
          <div className="mt-3 mr-2 ml-1 pl-3 ">
            <VolumeIcon
              onClick={toggleMute}
              className="cursor-pointer"
              size={30}
            />
          </div>

          <Slider value={volume} onChange={(value) => setVolume(value)} />
        </div>
        <div className="flex items-center gap-x-2 mt-[2px] mb-3">
          <div className="cursor-pointer rounded-full border border-blue-900 p-2">
            <a onClick={handleDownload}>
              <BsArrowDown size={20} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerContent;
