import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center animate-fade-in">
        <div className="relative mb-8">
          <h1 className="text-[150px] md:text-[200px] font-display font-bold text-primary/10 leading-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <Home className="w-16 h-16 text-primary mx-auto mb-4 animate-float" />
              <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
                Room Not Found
              </h2>
            </div>
          </div>
        </div>
        
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          Looks like you've wandered into an unbuilt section of the house. 
          Let's get you back to the main floor.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="nvidia" asChild>
            <Link to="/">
              <Home className="w-4 h-4" />
              Back to Homepage
            </Link>
          </Button>
          <Button variant="nvidia-outline" onClick={() => window.history.back()}>
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
