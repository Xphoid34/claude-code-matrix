import "./index.css";
import { Composition } from "remotion";
import { AbsoluteFill } from "remotion";

// Placeholder composition - yeni video için değiştirilecek
const Placeholder: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div style={{ color: "white", fontSize: 60, fontWeight: "bold" }}>
        Yeni Video 🎬
      </div>
    </AbsoluteFill>
  );
};

// Video yapılandırması - Reels formatı (9:16)
const VIDEO_CONFIG = {
  width: 1080,
  height: 1920,
  fps: 30,
  durationInFrames: 450, // 15 saniye
};

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MyVideo"
        component={Placeholder}
        durationInFrames={VIDEO_CONFIG.durationInFrames}
        fps={VIDEO_CONFIG.fps}
        width={VIDEO_CONFIG.width}
        height={VIDEO_CONFIG.height}
      />
    </>
  );
};
