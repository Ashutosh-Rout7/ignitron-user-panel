import { useEffect, useRef, useState } from "react";

function CatCursor() {
  const [isMobile, setIsMobile] = useState(
    window.innerWidth < 768
  );

  const catRef = useRef(null);
  const trail = useRef([]);
  const pos = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const animId = useRef(null);

  // Detect mobile screen
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Hide cat completely on mobile
  if (isMobile) {
    return null;
  }

  useEffect(() => {
    const onMove = (e) => {
      trail.current.push({
        x: e.clientX,
        y: e.clientY,
      });

      if (trail.current.length > 15) {
        trail.current.shift();
      }

      pos.current =
        trail.current[0] || {
          x: e.clientX,
          y: e.clientY,
        };
    };

    window.addEventListener("mousemove", onMove);

    const animate = () => {
      current.current.x +=
        (pos.current.x - current.current.x) * 0.05;

      current.current.y +=
        (pos.current.y - current.current.y) * 0.05;

      if (catRef.current) {
        catRef.current.style.left =
          `${current.current.x}px`;

        catRef.current.style.top =
          `${current.current.y}px`;

        const dx =
          pos.current.x - current.current.x;

        catRef.current.style.transform =
          `translate(-50%, -50%) scaleX(${dx < -1 ? -1 : 1})`;
      }

      animId.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener(
        "mousemove",
        onMove
      );

      cancelAnimationFrame(animId.current);
    };
  }, []);

  return (
    <div
      ref={catRef}
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        pointerEvents: "none",
        zIndex: 9999,
        userSelect: "none",
      }}
    >
      <img
        src="/cat.gif"
        alt="cat"
        width="70"
        height="70"
        style={{
          imageRendering: "pixelated",
        }}
      />
    </div>
  );
}

export default CatCursor;