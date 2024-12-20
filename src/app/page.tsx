"use client";

import { useEffect, useRef, useState } from "react";
import { SWATCHES } from "../../constants";
import toast from "react-hot-toast";

interface GeneratedResponse {
  expr: string;
  result: string;
}

interface Variables {
  [key: string]: string | number;
}

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [selectedColor, setSelectedColor] = useState("rgb(255,255,255)");
  const [reset, setReset] = useState(false);
  const [result, setResult] = useState<GeneratedResponse | null>(null);
  const [variables,] = useState<Variables>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (reset) {
      resetCanvas();
      setReset(false);
    }
  }, [reset]);

  useEffect(() => {
    const canvas = canvasRef.current;
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
    if (idleTimeout.current) {
      clearTimeout(idleTimeout.current);
    }
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
  const [isIdle, setIsIdle] = useState(false);
  const idleTimeout = useRef<NodeJS.Timeout | null>(null);

  const captureDrawing = (e: React.MouseEvent) => {
    if (!isDrawing) return;
    setIsIdle(false);
    if (idleTimeout.current) {
      clearTimeout(idleTimeout.current);
    }
    idleTimeout.current = setTimeout(() => {
      setIsIdle(true);
      if(!(isIdle &&isDrawing))sendData();
    }, 2000);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.strokeStyle = selectedColor;
        ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        ctx.stroke();
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900/40  text-white">
      {/* Control Bar */}
      <div className="grid top-10 absolute left-1/2 tranform -translate-x-1/2 grid-cols-3 gap-4 p-4 items-center w-[80%] border-2 border-gray-800/50 rounded-full bg-gray-700/30 backdrop-blur-xl mx-auto">
        <button
          onClick={resetCanvas}
          className="font-semibold rounded-full py-2 px-6 bg-red-400/50 backdrop-blur-lg hover:bg-red-700 text-white transition-shadow shadow-md hover:shadow-xl"
          disabled={loading}
        >
          Reset
        </button>
        <div className="flex justify-center space-x-2">
          {SWATCHES.map((color, index) => (
            <div
              key={index}
              onClick={() => setSelectedColor(color)}
              style={{
                backgroundColor: color,
                border:
                  color === selectedColor ? "2px solid #00FFAB" : "2px solid transparent",
              }}
              className="rounded-full w-6 h-6 cursor-pointer transform hover:scale-110 transition-transform"
            />
          ))}
        </div>
        <button
          onClick={sendData}
          className="font-semibold rounded-full py-2 px-6 bg-green-600 hover:bg-green-700 text-white transition-shadow shadow-md hover:shadow-xl"
          disabled={loading}
        >
          {loading ? "Calculating..." : "Calculate"}
        </button>
      </div>

      {/* Result Display */}
      {result && (
        <div className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-gray-800/30 backdrop-blur-lg p-6 rounded-xl border border-gray-800 text-center">
          <button
            onClick={() => setResult(null)}
            className="absolute top-1 right-3 text-gray-400 hover:text-gray-200 text-3xl"
          >
            &times;
          </button>
          <div className="text-2xl font-bold mb-3 text-gray-400 py-2">
            Expression: {JSON.parse(result.expr.slice(8, -4)).expr}
          </div>
          <div className="text-2xl font-semibold text-green-400">
            Result: {JSON.parse(result.expr.slice(8, -4)).result}
          </div>
        </div>
      )}

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={captureDrawing}
        onMouseOut={stopDrawing}
        onMouseUp={stopDrawing}
        className="flex-1 w-full border-t-2"
      />
      <a
        href="https://twitter.com/deevee47"
        className=" absolute bottom-10 right-10 ml-2 flex items-center text-blue-400 hover:text-blue-700 transition duration-300"
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="20"
          height="20"
          className="mr-1"
          fill="currentColor"
        >
          <path
            d="M22.46 6.011c-.77.342-1.59.572-2.46.675.885-.529 1.56-1.368 1.876-2.364-.828.492-1.74.841-2.71 1.032-.781-.832-1.89-1.351-3.12-1.351-2.36 0-4.28 1.928-4.28 4.296 0 .336.038.663.112.974-3.566-.178-6.73-1.89-8.843-4.493-.37.635-.58 1.374-.58 2.163 0 1.498.761 2.818 1.91 3.596-.707-.023-1.373-.216-1.96-.539v.053c0 2.089 1.468 3.83 3.415 4.227-.358.097-.736.15-1.115.15-.273 0-.54-.027-.803-.08.542 1.693 2.116 2.92 3.98 2.95-1.46 1.144-3.3 1.83-5.29 1.83-1.627 0-3.213-.213-4.744-.627 2.893 1.849 6.344 2.925 9.996 2.925 11.96 0 18.493-9.923 18.493-18.493 0-.28-.01-.56-.03-.839 1.263-.914 2.358-2.047 3.221-3.338z"
          />
        </svg>
        @deevee47
      </a>
    </div>
  );
}
