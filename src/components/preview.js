import React from 'react';
import Button from '@material-ui/core/Button';


function SimpleMenu() {
    function preview() {
        let canvas = document.getElementById("canvas");
        canvas.toBlob(function (blob) {
            let url = URL.createObjectURL(blob)
            window.open(url, '_black')
        }, "image/jpeg", 0.95);
    }
    return (
        <div>
            <Button
                onClick={preview}
            >
                在新窗口中预览
            </Button>
        </div>
    );
}

export default SimpleMenu;
