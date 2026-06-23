import { useEffect, useRef } from "react";

function CatCursor() {
  const catRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const animId = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove);

    const animate = () => {
      current.current.x += (pos.current.x - current.current.x) * 0.08;
      current.current.y += (pos.current.y - current.current.y) * 0.08;

      if (catRef.current) {
        catRef.current.style.left = `${current.current.x}px`;
        catRef.current.style.top = `${current.current.y}px`;

        // flip left/right based on direction
        const dx = pos.current.x - current.current.x;
        catRef.current.style.transform = `translate(-50%, -50%) scaleX(${dx < -1 ? -1 : 1})`;
      }
      animId.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(animId.current);
    };
  }, []);

return (
    <div
      ref={catRef}
      style={{
        position: "fixed",
        left: 0,          // ← add this
        top: 0,           // ← add this
        pointerEvents: "none",
        zIndex: 9999,
        userSelect: "none",
        mixBlendMode: "normal",
      }}
    >
      <img
        src="/cat.gif"
        width="70"
        height="70"
        alt="cat"
        style={{
          imageRendering: "pixelated",
          mixBlendMode: "screen",   // ← this removes white background!
        }}
      />
    </div>
  );
}

export default CatCursor;