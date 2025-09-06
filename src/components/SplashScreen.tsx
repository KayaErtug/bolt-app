// src/components/SplashScreen.tsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(timer);
          setTimeout(onFinish, 500); // tamamlandıktan sonra yönlendir
          return 100;
        }
        return p + Math.floor(Math.random() * 15);
      });
    }, 500);

    return () => clearInterval(timer);
  }, [onFinish]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white relative overflow-hidden">
      {/* Neon ışın efekti */}
      <motion.div
        className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500"
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{ repeat: Infinity, duration: 2 }}
      />

      {/* Işın kılıcı gibi efekt */}
      <motion.div
        className="w-64 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-purple-600 shadow-lg shadow-cyan-400/50"
        animate={{ scaleX: [0.2, 1, 0.2] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      />

      <div className="mt-8 text-3xl font-bold tracking-widest bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
        Maris Coin
      </div>

      {/* Progress */}
      <div className="mt-6 text-lg text-gray-300">
        Uploading… {progress}%
      </div>
    </div>
  );
}
