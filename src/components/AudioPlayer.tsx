import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { useState, useRef } from "react";

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([100]);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-muted rounded"></div>
          <div>
            <h4 className="font-medium">Track Title</h4>
            <p className="text-sm text-muted-foreground">Artist Name</p>
          </div>
        </div>
        
        <div className="flex flex-col items-center flex-1 max-w-xl px-8">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <SkipBack className="h-5 w-5" />
            </Button>
            <Button onClick={togglePlay} size="icon">
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </Button>
            <Button variant="ghost" size="icon">
              <SkipForward className="h-5 w-5" />
            </Button>
          </div>
          <Slider className="w-full mt-2" />
        </div>

        <div className="flex items-center space-x-2">
          <Volume2 className="h-5 w-5" />
          <Slider
            className="w-24"
            value={volume}
            onValueChange={setVolume}
            max={100}
            step={1}
          />
        </div>

        <audio ref={audioRef}>
          <source src="" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  );
};

export default AudioPlayer;