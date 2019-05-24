import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';
import Settings from './settings'

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

function AlertDialogSlide() {
    const [open, setOpen] = React.useState(false);

    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    return (
        <div>
            <Button onClick={handleClickOpen}>配置画布</Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                fullWidth
                maxWidth={'xs'}
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                {/* <DialogTitle id="alert-dialog-slide-title">{"调整画图参数重新生成背景图"}</DialogTitle> */}
                <DialogContent>
                    <Settings />
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default AlertDialogSlide;
