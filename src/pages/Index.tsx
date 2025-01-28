import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Music, User } from "lucide-react";
import { useState } from "react";
import AudioPlayer from "@/components/AudioPlayer";
import { AuthButton } from "@/components/AuthButton";
import { UploadDialog } from "@/components/UploadDialog";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { ErrorBoundary } from "@/components/error-boundary";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { CreatePlaylistDialog } from "@/components/playlist/create-playlist-dialog";
import { PlaylistCard } from "@/components/playlist/playlist-card";
import { useToast } from "@/hooks/use-toast";

interface Song {
  id: string;
  title: string;
  artist: string;
  file_path: string;
}

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const { toast } = useToast();

  // Fetch songs from Supabase
  const { data: songs, isLoading: songsLoading } = useQuery({
    queryKey: ['songs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('songs')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    }
  });

  // Fetch playlists
  const { data: playlists, isLoading: playlistsLoading } = useQuery({
    queryKey: ['playlists'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('playlists')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    }
  });

  // Filter songs based on search query
  const filteredSongs = songs?.filter(song => 
    song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const handleSongClick = (song: Song) => {
    setSelectedSong(song);
    toast({
      title: "Now Playing",
      description: `${song.title} by ${song.artist}`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b px-4 py-3">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Music className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              Retrospace
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
            <AuthButton />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 pt-20 pb-32">
        {/* Search and Actions Section */}
        <div className="max-w-xl mx-auto mb-12">
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search for songs, artists, or genres..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-secondary/50"
              />
            </div>
            <CreatePlaylistDialog />
            <UploadDialog />
          </div>
        </div>

        <ErrorBoundary>
          {/* Playlists Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                Your Playlists
              </span>
            </h2>
            {playlistsLoading ? (
              <div className="flex justify-center py-8">
                <LoadingSpinner />
              </div>
            ) : playlists && playlists.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {playlists.map((playlist) => (
                  <PlaylistCard
                    key={playlist.id}
                    playlist={playlist}
                    onPlay={() => {
                      // TODO: Implement playlist playback
                      toast({
                        title: "Coming Soon",
                        description: "Playlist playback will be available soon!",
                      });
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  No playlists yet. Create one to get started!
                </p>
              </div>
            )}
          </section>

          {/* Songs Section */}
          <section>
            <h2 className="text-2xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                {searchQuery ? 'Search Results' : 'All Songs'}
              </span>
            </h2>
            {songsLoading ? (
              <div className="flex justify-center py-8">
                <LoadingSpinner />
              </div>
            ) : filteredSongs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSongs.map((song) => (
                  <div
                    key={song.id}
                    className="group bg-card hover:bg-accent transition-colors duration-300 rounded-xl overflow-hidden cursor-pointer"
                    onClick={() => handleSongClick(song)}
                  >
                    <div className="relative">
                      <img
                        src={`https://picsum.photos/seed/${song.id}/400`}
                        alt={song.title}
                        className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <Button
                        size="icon"
                        className="absolute bottom-4 right-4 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        <Music className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg">{song.title}</h3>
                      <p className="text-sm text-muted-foreground">{song.artist}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Music className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No songs found</h3>
                <p className="text-muted-foreground">
                  {searchQuery ? "Try searching with different keywords" : "Start by uploading some tracks!"}
                </p>
              </div>
            )}
          </section>
        </ErrorBoundary>
      </main>

      {/* Audio Player */}
      <AudioPlayer selectedSong={selectedSong} />
    </div>
  );
};

export default Index;