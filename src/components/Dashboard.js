import { useState } from "react";
import CanvasImageUploader from "./CanvasImageUploader";

function Dashboard({
    sizeBrushRef,
    canvas, 
    context, 
    canvas_start_index,
    can_redo_array,
    can_undo_array,
    setCanvasBackground,
    clearCanvas,
}) {
    
    const [sizeBrush, setSizeBrush] = useState(15);
    const handleSizeChange = (event) => { setSizeBrush(event.target.value); };

    function undoBtn() {
        if (can_undo_array.current.length === 0) return;
        
        let del_elem = can_undo_array.current.pop();
        can_redo_array.current.push(del_elem);

        if (canvas_start_index.current <= 0) {
            clearCanvas();
        } else {
            canvas_start_index.current += -1;
            context.current.putImageData(can_undo_array.current[can_undo_array.current.length-1], 0, 0);
        }   
    }

    function redoBtn() {
        if (can_redo_array.current.length === 0) {
          return;
        }
  
        let aded_elem = can_redo_array.current.pop();
        can_undo_array.current.push(aded_elem);
        context.current.putImageData(can_undo_array.current[can_undo_array.current.length-1], 0, 0);
  
        canvas_start_index.current += 1;        
    };

    function saveImg() {
        const link = document.createElement("a");
        link.download = `${Date.now()}.png`;
        link.href = canvas.current.toDataURL();
        link.click();
    }

    
    return (
        <section className="tools-board">
          <div className="row">
            <label className="title">Shapes</label>
            <ul className="options">
              <li className="option tool" id="rectangle">
                <img src="icons/rectangle.svg" alt=""></img>
                <span>Rectangle</span>
              </li>
              <li className="option tool" id="circle">
                <img src="icons/circle.svg" alt=""></img>
                <span>Circle</span>
              </li>
              <li className="option tool" id="triangle">
                <img src="icons/triangle.svg" alt=""></img>
                <span>Triangle</span>
              </li>
              <li className="option">
                <input type="checkbox" id="fill-color"></input>
                <label htmlFor="fill-color">Fill color</label>
              </li>
            </ul>
          </div>
          <div className="row">
            <label className="title">Options</label>
            <ul className="options">
              <li className="option active tool" id="brush">
                <img src="icons/brush.svg" alt=""></img>
                <span>Brush</span>
              </li>
              <li className="option tool" id="eraser">
                <img src="icons/eraser.svg" alt=""></img>
                <span>Eraser</span>
              </li>
              <li className="option">
                <input
                    type="range"
                    id="size-slider"
                    min="1"
                    max="30"
                    value={sizeBrush}
                    onChange={handleSizeChange}
                />
              </li>
            </ul>
          </div>
          <div className="row colors">
            <label className="title">Colors</label>
            <ul className="options">
              <li className="option"></li>
              <li className="option selected"></li>
              <li className="option"></li>
              <li className="option"></li>
              <li className="option"></li>
              <li className="option"></li>
              <li className="option"></li>
            </ul>
          </div>
          <div className="row buttons">
            <button onClick={undoBtn} className="undo">Undo</button>
            <button onClick={redoBtn} className="undo">Redo</button>
            <button onClick={clearCanvas} className="clear-canvas">Clear Canvas</button>
            <button onClick={saveImg} className="save-img">Save As Image</button>
            <CanvasImageUploader 
                canvas={canvas} 
                context={context}
                can_undo_array={can_undo_array}
                canvas_start_index={canvas_start_index}
            />
          </div>
        </section>
    );
  }

  
  export default Dashboard;