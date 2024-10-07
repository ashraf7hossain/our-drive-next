"use client";
const NeonProgressBar = ({ progress, uploading }: any) => {
  return (
    <>
      {uploading && (
        <div className="relative w-full h-3 bg-gray-800 rounded-lg shadow-inner">
          {/* Progress bar */}
          <div
            className="absolute top-0 left-0 h-full rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 neon-glow transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>

          {/* Progress text */}
          {uploading && (
            <p className="absolute w-full text-center text-white font-bold">
              {progress}%
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default NeonProgressBar;
