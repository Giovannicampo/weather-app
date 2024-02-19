import { ReactElement } from "react";
import { ForecastDay, Location } from "../../Weather/dto";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { DialogActions } from "@mui/material";
import Button from "@mui/material/Button";
import { DayBox } from "./DayBox";

interface DayDialogProps {
  readonly open: boolean;
  readonly handleClose: () => void;
  readonly forecastData: ForecastDay;
  readonly location: Location;
}

export default function DayDialog(props: DayDialogProps): ReactElement {

  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <DialogContent sx={{ padding: "0px" }}>
        <DayBox forecastData={props.forecastData} location={props.location} />
      </DialogContent>
      <DialogActions>
        <Button sx={{ color: "#b33904", padding: "0px" }} onClick={props.handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
