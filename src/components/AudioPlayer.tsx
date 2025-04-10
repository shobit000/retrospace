import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Song {
  id: string;
  title: string;
  artist: string;
  file_path: string;
}


interface AudioPlayerProps {
  selectedSong?: Song | null;
}

const AudioPlayer = ({ selectedSong }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([100]);
  const [songUrl, setSongUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const fetchSongUrl = async () => {
      if (selectedSong?.file_path) {
        try {
          const { data } = await supabase.storage
            .from('songs')
            .createSignedUrl(selectedSong.file_path, 3600); // URL valid for 1 hour

          if (data?.signedUrl) {
            setSongUrl(data.signedUrl);
            // Reset playing state when new song is selected
            setIsPlaying(false);
            if (audioRef.current) {
              audioRef.current.currentTime = 0;
            }
          }
        } catch (error) {
          console.error('Error fetching song URL:', error);
        }
      }
    };

    fetchSongUrl();
  }, [selectedSong]);

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

  // Update volume when slider changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume[0] / 100;
    }
  }, [volume]);

  if (!selectedSong) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-muted rounded">
            <img
              src={`https://picsum.photos/seed/${selectedSong.id}/200`}
              alt={selectedSong.title}
              className="w-full h-full object-cover rounded"
            />
          </div>
          <div>
            <h4 className="font-medium">{selectedSong.title}</h4>
            <p className="text-sm text-muted-foreground">{selectedSong.artist}</p>
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

        <audio ref={audioRef} src={songUrl || ''}>
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  );
};

export default AudioPlayer;
