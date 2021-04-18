import React, {ComponentType} from "react";
import {Button} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import {compose} from "recompose";
import {useDispatch, useSelector} from "react-redux";
import {closeModal} from "@/store/redux/actions/GlobalModalAction";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";

interface IProps {
}

const GlobalModal: ComponentType<IProps> = (props: IProps) => {
  const {children, isOpen} = useSelector((state: any) => state.globalModal);
  const dispatch = useDispatch();

  return (
    <Dialog
      open={isOpen}
      onClose={() => dispatch(closeModal())}
    >
      <DialogTitle>
        {children.title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {children.content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={() => dispatch(closeModal())} color="primary">
          Huỷ
        </Button>
        <Button onClick={children.action} color="primary">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default compose<IProps, any>()(GlobalModal);
