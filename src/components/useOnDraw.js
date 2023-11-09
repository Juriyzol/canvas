import { useEffect } from "react";

export function useOnDraw(
    canvasRef, 
    context, 
    canvas_start_index,
    can_redo,
    can_undo,
    setCanvasBackground,
    clearCanvas,
    sizeBrush
) {

    useEffect(() => {
        let can_undo_array = can_undo.current;

        const canvas = canvasRef.current;
        const ctx = context.current;
        const toolBtns = document.querySelectorAll(".tool");
        const fillColor = document.querySelector("#fill-color");
        const sizeSlider = document.querySelector("#size-slider");
        const colorBtns = document.querySelectorAll(".colors .option");
        
        // global variables
        let prevMouseX; 
        let prevMouseY; 
        let snapshot;
        let isDrawing = false;
        let selectedTool = "brush";
        let brushWidth = 15;
        let selectedColor = "#000";

        
        window.addEventListener("load", () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            setCanvasBackground();
        });
        
        const drawRect = (e) => {
            // if fillColor isn't checked draw a rect with border else draw rect with background
            if(!fillColor.checked) {
                // creating circle according to the mouse pointer
                return ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
            }
            ctx.fillRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
        }
        
        const drawCircle = (e) => {
            ctx.beginPath();
            let radius = Math.sqrt(Math.pow((prevMouseX - e.offsetX), 2) + Math.pow((prevMouseY - e.offsetY), 2));
            ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI);
            fillColor.checked ? ctx.fill() : ctx.stroke();
        }
        
        const drawTriangle = (e) => {
            ctx.beginPath();
            ctx.moveTo(prevMouseX, prevMouseY);
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY);
            ctx.closePath();
            fillColor.checked ? ctx.fill() : ctx.stroke();
        }
        
        const startDraw = (e) => {
            isDrawing = true;
            prevMouseX = e.offsetX;
            prevMouseY = e.offsetY;
            ctx.beginPath(); 
            ctx.lineWidth = brushWidth;
            ctx.strokeStyle = selectedColor;
            ctx.fillStyle = selectedColor;
            snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
        }
        
        const drawing = (e) => {
            if(!isDrawing) return;
            ctx.putImageData(snapshot, 0, 0);
        
            if(selectedTool === "brush" || selectedTool === "eraser") {
                ctx.strokeStyle = selectedTool === "eraser" ? "#fff" : selectedColor;
                ctx.lineTo(e.offsetX, e.offsetY);
                ctx.stroke();
            } else if(selectedTool === "rectangle"){
                drawRect(e);
            } else if(selectedTool === "circle"){
                drawCircle(e);
            } else {
                drawTriangle(e);
            }
        }
        
        
        toolBtns.forEach(btn => {
            btn.addEventListener("click", () => { // adding click event to all tool option
                // removing active class from the previous option and adding on current clicked option
                document.querySelector(".options .active").classList.remove("active");
                btn.classList.add("active");
                selectedTool = btn.id;
            });
        });
    
        sizeSlider.addEventListener("change", () => brushWidth = sizeSlider.value); // passing slider value as brushSize
    
        colorBtns.forEach(btn => {
            btn.addEventListener("click", () => { // adding click event to all color button
                // removing selected class from the previous option and adding on current clicked option
                document.querySelector(".options .selected").classList.remove("selected");
                btn.classList.add("selected");
                // passing selected btn background color as selectedColor value
                selectedColor = window.getComputedStyle(btn).getPropertyValue("background-color");
            });
        });
        
        canvas.addEventListener("mousedown", startDraw);
        canvas.addEventListener("mousemove", drawing);

        canvas.addEventListener("mouseup", () => {
            isDrawing = false
            can_undo_array.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
            canvas_start_index.current +=1;
        });


        function cleanup() {

        }

        return () => cleanup();
    }, []);

};