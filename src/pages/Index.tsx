import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Music, User } from "lucide-react";
import { useState, useEffect } from "react";
import AudioPlayer from "@/components/AudioPlayer";
import { AuthButton } from "@/components/AuthButton";
import { UploadDialog } from "@/components/UploadDialog";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch songs from Supabase
  const { data: songs, isLoading } = useQuery({
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

  // Filter songs based on search query
  const filteredSongs = songs?.filter(song => 
    song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

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
        {/* Search Section */}
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
            <UploadDialog />
          </div>
        </div>

        {/* Featured Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              {searchQuery ? 'Search Results' : 'Featured Tracks'}
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              // Loading skeleton
              Array(6).fill(null).map((_, index) => (
                <div key={index} className="animate-pulse bg-card rounded-xl overflow-hidden">
                  <div className="bg-accent h-64"></div>
                  <div className="p-4">
                    <div className="h-4 bg-accent rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-accent rounded w-1/2"></div>
                  </div>
                </div>
              ))
            ) : filteredSongs.length > 0 ? (
              filteredSongs.map((song, index) => (
                <div
                  key={song.id}
                  className="group bg-card hover:bg-accent transition-colors duration-300 rounded-xl overflow-hidden"
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
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <Music className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No songs found</h3>
                <p className="text-muted-foreground">
                  {searchQuery ? "Try searching with different keywords" : "Start by uploading some tracks!"}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Recent Uploads section can be removed since we're now showing actual data */}
      </main>

      {/* Audio Player */}
      <AudioPlayer />
    </div>
  );
};

export default Index;