import { ReactElement } from "react";
import Collapse from "@mui/material/Collapse";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

interface AlertProps {
  readonly open: boolean;
  readonly setOpen: (flag: boolean) => void;
}

export default function ErrorAlert(props: AlertProps): ReactElement {
  const { open, setOpen } = props;

  return (
    <Collapse in={open}>
      <Alert
        severity="error"
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setOpen(false);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        sx={{ mb: 2 }}
      >
        Date string doesn't match the following expression YYYY-MM-DD.
      </Alert>
    </Collapse>
  );
}
