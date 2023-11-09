

function CanvasImageUploader({
    canvas, 
    context, 
    can_undo_array, 
    canvas_start_index
}) {

    const imageUpload = (e) => {
        const file = e.target.files[0];
    
        if (file) {
            const reader = new FileReader();
    
            reader.onload = (event) => {
                const canvasWidth = canvas.current.width;
                const canvasHeight = canvas.current.height;

                const img = new Image();
                img.src = event.target.result;
        
                img.onload = () => {
                    context.current.clearRect(0, 0, canvas.current.width, canvas.current.height);

                    if ( img.width > canvasWidth || img.height > canvasHeight ) {

                        let newWidth, newHeight;
                        if (img.width > img.height) {
                            newWidth = canvasWidth;
                            newHeight = (img.height / img.width) * canvasWidth;
                        } else {
                            newWidth = (img.width / img.height) * canvasHeight;
                            newHeight = canvasHeight;
                        }
                
                        canvas.width = newWidth;
                        canvas.height = newHeight;

                        context.current.drawImage(img, 0, 0, newWidth, newHeight);
                        return;
                    }

                    // context.current.drawImage(img, 0, 0, canvas.current.width, canvas.current.height);
                    context.current.drawImage(img, 0, 0, img.width, img.height);


                    // TODO
                    // This is necessary so that after loading an image, Undo works not only after the first freehand-drawn shape.
                    // fakeDraw();
                    // can_undo_array.current.push(context.current.getImageData(0, 0, canvas.width, canvas.height));
                    // canvas_start_index.current += 1;
                };
            };
    
            reader.readAsDataURL(file);
        }
    };

    // TODO
    // This is necessary so that after loading an image, Undo works not only after the first freehand-drawn shape.
    // function fakeDraw() {
        // startDraw()
    // }

    const clickInput = () => {
        const fileInput = document.getElementById('fileInput');
        fileInput.click();
    }

    return (
        <div>
            <input
            type="file"
            id="fileInput"
            accept="image/*"
            onChange={imageUpload}
            style={{ display: 'none' }}
            />
            <button onClick={clickInput} className="save-img">Load Image</button>
        </div>
    );
}


export default CanvasImageUploader;
