import { useEffect, useState } from "react";

export default function UpButton() {
  const [show, setShow] = useState(false);

  const handleUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!show) return null;

  return (
    <button className="go-up" onClick={handleUp} tabIndex={0}>
      <i className="fa-solid fa-chevron-up"></i>
    </button>
  );
}