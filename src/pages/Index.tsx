import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Music, User } from "lucide-react";
import { useState } from "react";
import AudioPlayer from "@/components/AudioPlayer";
import { AuthButton } from "@/components/AuthButton";
import { UploadDialog } from "@/components/UploadDialog";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

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
              Featured Tracks
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Synthwave Dreams",
                artist: "Neon Rider",
                image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
              },
              {
                title: "Digital Sunset",
                artist: "Cyber Pulse",
                image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
              },
              {
                title: "Retro Nights",
                artist: "Pixel Wave",
                image: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
              },
            ].map((track, index) => (
              <div
                key={index}
                className="group bg-card hover:bg-accent transition-colors duration-300 rounded-xl overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={track.image}
                    alt={track.title}
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
                  <h3 className="font-semibold text-lg">{track.title}</h3>
                  <p className="text-sm text-muted-foreground">{track.artist}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Uploads */}
        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              Recent Uploads
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Cyber Groove",
                artist: "Data Stream",
                image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
              },
              {
                title: "Electric Dreams",
                artist: "Virtual Mind",
                image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
              },
              {
                title: "Binary Sunset",
                artist: "Code Runner",
                image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
              },
            ].map((track, index) => (
              <div
                key={index}
                className="group bg-card hover:bg-accent transition-colors duration-300 rounded-xl overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={track.image}
                    alt={track.title}
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
                  <h3 className="font-semibold text-lg">{track.title}</h3>
                  <p className="text-sm text-muted-foreground">{track.artist}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Audio Player */}
      <AudioPlayer />
    </div>
  );
};

export default Index;