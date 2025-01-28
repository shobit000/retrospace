import { Button } from "@/components/ui/button";
import { PlayCircle, Plus } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface PlaylistCardProps {
  playlist: {
    id: string;
    title: string;
    description: string | null;
  };
  onPlay?: () => void;
}

export const PlaylistCard = ({ playlist, onPlay }: PlaylistCardProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handlePlay = async () => {
    try {
      setIsLoading(true);
      const { data: songs, error } = await supabase
        .from('playlist_songs')
        .select('songs(*)')
        .eq('playlist_id', playlist.id)
        .order('added_at', { ascending: true });

      if (error) throw error;

      if (songs && songs.length > 0) {
        onPlay?.();
      } else {
        toast({
          title: "No songs in playlist",
          description: "Add some songs to this playlist to start playing",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load playlist songs",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="group bg-card hover:bg-accent transition-colors duration-300 rounded-xl overflow-hidden">
      <div className="relative aspect-square bg-muted">
        <div className="absolute inset-0 flex items-center justify-center">
          <Button
            size="icon"
            className="rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={handlePlay}
            disabled={isLoading}
          >
            <PlayCircle className="h-6 w-6" />
          </Button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg">{playlist.title}</h3>
        {playlist.description && (
          <p className="text-sm text-muted-foreground">{playlist.description}</p>
        )}
      </div>
    </div>
  );
};