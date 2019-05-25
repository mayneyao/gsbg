import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

function SimpleMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);

    function handleClick(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }
    function download(imageType) {
        let canvas = document.getElementById("canvas");
        let img = ''
        switch (imageType) {
            case 'png':
                img = canvas.toDataURL("image/png");
            case 'jpeg':
                img = canvas.toDataURL("image/jpeg");
        }
        let link = document.createElement('a');
        link.download = `gsbg.${imageType}`;
        link.href = img
        link.click()
        handleClose()
    }
    return (
        <div>
            <Button
                aria-owns={anchorEl ? 'simple-menu' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                下载图片
            </Button>
            <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                <MenuItem onClick={() => download('png')}>下载为PNG</MenuItem>
                <MenuItem onClick={() => download('jpeg')}>下载为JPEG</MenuItem>
                {/* <MenuItem onClick={handleClose}>下载为GIF</MenuItem> */}
            </Menu>
        </div>
    );
}

export default SimpleMenu;
