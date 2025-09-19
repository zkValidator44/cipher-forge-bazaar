import digitalLantern from "@/assets/digital-lantern.jpg";

export const DigitalLanterns = () => {
  return (
    <div className="flex justify-center items-end space-x-8 mb-8">
      {/* Left lantern */}
      <div className="flex flex-col items-center animate-lantern-swing">
        <div className="w-2 h-12 bg-gradient-to-b from-muted to-border mb-2" />
        <div className="relative w-16 h-20 overflow-hidden rounded-lg bg-gradient-stall border border-border">
          <img
            src={digitalLantern}
            alt="Digital Lantern"
            className="w-full h-full object-cover"
          />
          {/* Pixel flame effect */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
            <div className="w-6 h-8 bg-gradient-to-t from-secondary via-accent to-primary-glow rounded-full animate-flame-flicker opacity-80 blur-sm" />
            <div className="absolute inset-0 w-4 h-6 bg-secondary rounded-full animate-flame-flicker ml-1 mt-1" />
          </div>
        </div>
      </div>

      {/* Center lantern */}
      <div className="flex flex-col items-center animate-lantern-swing" style={{ animationDelay: "1s" }}>
        <div className="w-2 h-16 bg-gradient-to-b from-muted to-border mb-2" />
        <div className="relative w-20 h-24 overflow-hidden rounded-lg bg-gradient-stall border border-border">
          <img
            src={digitalLantern}
            alt="Digital Lantern"
            className="w-full h-full object-cover"
          />
          {/* Pixel flame effect */}
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2">
            <div className="w-8 h-10 bg-gradient-to-t from-secondary via-accent to-primary-glow rounded-full animate-flame-flicker opacity-80 blur-sm" />
            <div className="absolute inset-0 w-6 h-8 bg-secondary rounded-full animate-flame-flicker ml-1 mt-1" />
          </div>
        </div>
      </div>

      {/* Right lantern */}
      <div className="flex flex-col items-center animate-lantern-swing" style={{ animationDelay: "0.5s" }}>
        <div className="w-2 h-12 bg-gradient-to-b from-muted to-border mb-2" />
        <div className="relative w-16 h-20 overflow-hidden rounded-lg bg-gradient-stall border border-border">
          <img
            src={digitalLantern}
            alt="Digital Lantern"
            className="w-full h-full object-cover"
          />
          {/* Pixel flame effect */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
            <div className="w-6 h-8 bg-gradient-to-t from-secondary via-accent to-primary-glow rounded-full animate-flame-flicker opacity-80 blur-sm" />
            <div className="absolute inset-0 w-4 h-6 bg-secondary rounded-full animate-flame-flicker ml-1 mt-1" />
          </div>
        </div>
      </div>
    </div>
  );
};