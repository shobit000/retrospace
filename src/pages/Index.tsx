import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Music, Upload, User } from "lucide-react";
import { useState } from "react";
import AudioPlayer from "@/components/AudioPlayer";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Navigation Bar */}
      <nav className="border-b px-4 py-3">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Music className="h-6 w-6" />
            <h1 className="text-xl font-bold">Retrospace</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Section */}
        <div className="max-w-xl mx-auto mb-8">
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search for songs, artists, or genres..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </Button>
          </div>
        </div>

        {/* Featured Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Featured Tracks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Placeholder for featured tracks */}
            <div className="p-4 border rounded-lg">
              <div className="aspect-square bg-muted rounded-md mb-2"></div>
              <h3 className="font-medium">Track Title</h3>
              <p className="text-sm text-muted-foreground">Artist Name</p>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="aspect-square bg-muted rounded-md mb-2"></div>
              <h3 className="font-medium">Track Title</h3>
              <p className="text-sm text-muted-foreground">Artist Name</p>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="aspect-square bg-muted rounded-md mb-2"></div>
              <h3 className="font-medium">Track Title</h3>
              <p className="text-sm text-muted-foreground">Artist Name</p>
            </div>
          </div>
        </section>

        {/* Recent Uploads */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Recent Uploads</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Placeholder for recent uploads */}
            <div className="p-4 border rounded-lg">
              <div className="aspect-square bg-muted rounded-md mb-2"></div>
              <h3 className="font-medium">Track Title</h3>
              <p className="text-sm text-muted-foreground">Artist Name</p>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="aspect-square bg-muted rounded-md mb-2"></div>
              <h3 className="font-medium">Track Title</h3>
              <p className="text-sm text-muted-foreground">Artist Name</p>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="aspect-square bg-muted rounded-md mb-2"></div>
              <h3 className="font-medium">Track Title</h3>
              <p className="text-sm text-muted-foreground">Artist Name</p>
            </div>
          </div>
        </section>
      </main>

      {/* Audio Player */}
      <AudioPlayer />
    </div>
  );
};

export default Index;