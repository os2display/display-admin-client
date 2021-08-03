import { useEffect, useRef } from "react";
import { ColorPicker as CP, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";

function ColorPicker({ color, show, handleChange, closeColorPicker }) {
  if (!show) {
    return <></>;
  }
  const [inputColor] = useColor("hex", color ?? "");
  function onPickedColor(selectedColor) {
    const returnTarget = { value: selectedColor.hex, id: show };
    handleChange({ target: returnTarget });
  }
  const ref = useRef();
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (ref.current && !ref.current.contains(e.target)) {
        closeColorPicker();
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, []);

  return (
    <div ref={ref} style={{ maxWidth: "456px" }}>
      <CP
        style={{ position: "absolute" }}
        width={456}
        height={228}
        color={inputColor}
        onChange={onPickedColor}
        hideHSV
        dark
      />
    </div>
  );
}
export default ColorPicker;
