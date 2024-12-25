"use client";

import { useEffect, useRef, useState } from "react";
import { SWATCHES } from "../../constants";
import toast from "react-hot-toast";
import { Eraser, Pencil, RotateCcw, Twitter, Wand2 } from "lucide-react";

interface GeneratedResponse {
  expr: string;
  result: string;
}

interface Variables {
  [key: string]: string | number;
}

interface clearCircleProps {
  context: CanvasRenderingContext2D;
  x: number;
  y: number;
  radius: number;
}

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [selectedColor, setSelectedColor] = useState("rgb(255,255,255)");
  const [reset, setReset] = useState(false);
  const [result, setResult] = useState<GeneratedResponse | null>(null);
  const [variables,] = useState<Variables>({});
  const [loading, setLoading] = useState(false);
  const [isErasing, setIsErasing] = useState(false);
  const [, setIsIdle] = useState(false);

  
  useEffect(() => {
    if (reset) {
      resetCanvas();
      setReset(false);
    }
  }, [reset]);
  function stopTouchScrolling(canvas: HTMLCanvasElement | null) {
    // Prevent scrolling when touching the canvas
    document.body.addEventListener("touchstart", function (e) {
      if (e.target == canvas) {
        e.preventDefault();
      }
    }, { passive: false });
    document.body.addEventListener("touchend", function (e) {
      if (e.target == canvas) {
        e.preventDefault();
      }
    }, { passive: false });
    document.body.addEventListener("touchmove", function (e) {
      if (e.target == canvas) {
        e.preventDefault();
      }
    }, { passive: false });

  }

  useEffect(() => {
    const canvas = canvasRef.current;
    stopTouchScrolling(canvas);
    
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight - canvas.offsetTop;
        ctx.lineCap = "round";
        ctx.lineWidth = 3;
      }
    }
  }, []);

  const sendData = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    const isEmpty = pixels.every((pixel, index) => {
      return index % 4 === 3 ? true : pixel === 0;
    });

    if (isEmpty) {
      toast.error("Please draw something first!");
      return;
    }

    setLoading(true);

    try {
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (blob) => {
            if (blob) resolve(blob);
            else reject(new Error("Failed to create blob"));
          },
          "image/jpeg",
          0.8
        );
      });

      const formData = new FormData();
      formData.append("image", blob, "drawing.jpg");
      formData.append("variables", JSON.stringify(variables));

      const response = await fetch("/api/analyze-image", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to analyze image");
      }

      if (data.results?.[0]) {
        console.log("Analysis results:", data.results[0]);
        setResult(data.results[0]);
        toast.success("Analysis complete!");
      } else {
        toast.error("No results found");
      }
    } catch (error) {
      console.error("Full error details:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to analyze drawing"
      );
    } finally {
      setLoading(false);
    }
  };

  const resetCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setResult(null);
      }
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsIdle(false);
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.style.background = "black";
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.beginPath();
        ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        setIsDrawing(true);
      }
    }
  };

  const stopDrawing = () => setIsDrawing(false);

  const eraseDrawing = () => {
    setIsErasing((prev) => !prev);
  };

  function clearCircle({ context, x, y, radius }: clearCircleProps) {
    context.save();
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI, true);
    context.clip();
    context.clearRect(x - radius, y - radius, radius * 2, radius * 2);
    context.restore();
  }

  const captureDrawing = (e: React.MouseEvent) => {
    if (!isDrawing) return;
    setIsIdle(false);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        if (isErasing) {
          clearCircle({
            context: ctx,
            x: e.nativeEvent.offsetX,
            y: e.nativeEvent.offsetY,
            radius: 10,
          });
          canvas.style.cursor = "crosshair";
        } else {
          ctx.strokeStyle = selectedColor;
          ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
          ctx.stroke();
        }
      }
    }
  };

  const touchCaptureDrawing = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    setIsIdle(false);
    
    const touch = e.touches[0];
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        if (isErasing) {
          clearCircle({
            context: ctx,
            x: touch.clientX,
            y: touch.clientY,
            radius: 10,
          });
          canvas.style.cursor = "crosshair";
        } else {
          ctx.strokeStyle = selectedColor;
          ctx.lineTo(touch.clientX, touch.clientY);
          ctx.stroke();
        }
      }
    }
  }
  const touchStartDrawing = (e: React.TouchEvent<HTMLCanvasElement>) => {
    setIsIdle(false);
    const touch = e.touches[0];
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.style.background = "black";
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.beginPath();
        ctx.moveTo(touch.clientX, touch.clientY);
        setIsDrawing(true);
      }
    }
  }



  return (
    <div className="flex flex-col h-screen bg-gray-900/40 text-white">
      {/* Mobile-Friendly Control Bar */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[95%] max-w-md">
        <div className="flex flex-col gap-3 p-3 bg-gray-800/30 backdrop-blur-lg rounded-xl border border-gray-700/50 shadow-lg">
          {/* Top Row - Essential Controls */}
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <button
                onClick={resetCanvas}
                className={`p-2 rounded-xl transition-all duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-500/20'
                  } tooltip-wrapper`}
                disabled={loading}
                title="Reset Canvas"
              >
                <RotateCcw className="w-6 h-6 text-red-400" />
              </button>

              <button
                onClick={eraseDrawing}
                className={`p-2 rounded-xl transition-all duration-200 ${isErasing ? 'bg-yellow-500/20' : ''
                  } ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-yellow-500/20'}`}
                disabled={loading}
                title={isErasing ? "Switch to Draw" : "Switch to Erase"}
              >
                {isErasing ? (
                  <Pencil className="w-6 h-6 text-yellow-400" />
                ) : (
                  <Eraser className="w-6 h-6 text-yellow-400" />
                )}
              </button>
            </div>

            <button
              onClick={sendData}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${loading
                  ? 'bg-green-500/20 cursor-wait'
                  : 'bg-green-500/20 hover:bg-green-500/30'
                }`}
              disabled={loading}
            >
              <Wand2 className="w-5 h-5" />
              <span className="text-sm">
                {loading ? "Performing magic trick..." : "Calculate!"}
              </span>
            </button>
          </div>

          {/* Bottom Row - Color Swatches */}
          <div className="flex items-center justify-center gap-3 w-full px-2">
            {SWATCHES.map((color, index) => (
              <button
                key={index}
                onClick={() => setSelectedColor(color)}
                className={`sm:h-6 w-6 h-4 rounded-full transition-all duration-200 transform hover:scale-110 ring-offset-2 ring-offset-gray-800 ${color === selectedColor ? 'ring-2 ring-teal-400' : ''
                  }`}
                style={{ backgroundColor: color }}
                title={`Color ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>


      {/* Result Display */}
      {result && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 max-w-[90%] w-auto">
          <div className="bg-gray-800/90 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-lg">
            <button
              onClick={() => setResult(null)}
              className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-200 hover:bg-gray-700/50 transition-all duration-200"
            >
              X
            </button>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="text-sm font-medium text-gray-400">Expression</div>
                <div className="text-lg font-semibold text-white">
                  {(() => {
                    const exprMatch = result.expr.match(/"expr":\s*"([^"]*)"/);
                    return exprMatch ? exprMatch[1] : "Reload and draw again";
                  })()}
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium text-gray-400">Result</div>
                <div className="text-lg font-semibold text-green-400">
                  {(() => {
                    const resultMatch = result.expr.match(/"result":\s*"([^"]*)"/);
                    return resultMatch ? resultMatch[1] : "Reload and draw again";
                  })()}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        onTouchStart={touchStartDrawing}
        onTouchMove={touchCaptureDrawing}
        onTouchEnd={stopDrawing}
        onTouchCancel={stopDrawing}
        onMouseDown={startDrawing}
        onMouseMove={captureDrawing}
        onMouseOut={stopDrawing}
        onMouseUp={stopDrawing}
        className="flex-1 w-full border-t border-gray-800/30"
      />

      {/* Twitter Link */}
      <a
        href="https://twitter.com/deevee47"
        className="fixed bottom-6 right-6 flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 transition-all duration-200"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Twitter fill="#60a5fa" size={24} />
        <span className="font-medium">@deevee47</span>
      </a>
    </div>
  );
}