import { React } from "react";
import { Button } from "react-bootstrap";

function ColorPreview({ name, color, clickedButton, label }) {
  return (
    <div className="d-flex">
      <div className="color-preview" style={{ backgroundColor: color }}></div>
      <Button
        variant="primary"
        type="button"
        onClick={() => clickedButton(name)}
      >
        {label}
      </Button>
    </div>
  );
}
export default ColorPreview;
