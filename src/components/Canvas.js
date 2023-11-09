import { useRef } from "react";
import Dashboard from './Dashboard';
import {useOnDraw} from './useOnDraw';


const Canvas = () => {

    const sizeBrush = useRef(15);

    const canvasRef = useRef(null);
    const context = useRef(null);
    function setCanvasRef(ref) {
        canvasRef.current = ref;
        context.current = ref.getContext("2d");
    }

    let canvas_start_index = useRef(-1);
    let can_redo_array = useRef([]);
    let can_undo_array = useRef([]);

    useOnDraw(
        canvasRef, 
        context, 
        canvas_start_index,
        can_redo_array,
        can_undo_array,
        setCanvasBackground,
        clearCanvas,
        sizeBrush
    );

    function setCanvasBackground() {
        // setting whole canvas background to white, so the downloaded img background will be white
        context.current.fillStyle = "#fff";
        context.current.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        context.current.fillStyle = "#000"; // setting fillstyle back to the selectedColor, it'll be the brush color
    }

    function clearCanvas() {
        context.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height); // clearing whole canvas
        setCanvasBackground();
        canvas_start_index.current = -1;
    }


    return(
        <>
        <Dashboard
            sizeBrushRef={sizeBrush}
            canvas={canvasRef} 
            context={context}
            canvas_start_index={canvas_start_index}
            can_redo_array={can_redo_array}
            can_undo_array={can_undo_array}
            setCanvasBackground={setCanvasBackground}
            clearCanvas={clearCanvas}
        />
        <section className="drawing-board">
            <canvas
                ref={setCanvasRef}
            ></canvas>
        </section>
        </>
    );

}

export default Canvas;











/*
    // let can_redo_array = [];
    // let can_undo_array = [];
    let start_index = -1;

    const [can_redo_array, set_can_redo_array] = useState([]);
    const [can_undo_array, set_can_undo_array] = useState([]);
    const [start_index_top, set_start_index_top] = useState(-1);


    console.log('can_redo_array - ', can_redo_array);
    console.log('can_undo_array - ', can_undo_array);
    console.log('start_index_top - ', can_undo_array);


    const {
        setCanvasRef,
        // onCanvasMouseDown
    } = useOnDraw(
        can_redo_array,
        set_can_redo_array,
        can_undo_array, 
        set_can_undo_array,
        start_index_top,
        set_start_index_top,
    );
*/



/*
    // console.log('can_redo_array - ', can_redo_array);
    // debugger;


    // const valuesForCanvas = {
    //     redo: {can_redo_array, set_can_redo_array},
    //     can_undo_array: [],
    //     start_index: -1,
    // }
*/