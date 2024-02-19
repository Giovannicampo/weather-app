import { ReactElement } from "react";
import { TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

interface SelectorProps {
  readonly handler: React.ChangeEventHandler;
  readonly days: number[];
}

export default function CustomSelector(props: SelectorProps): ReactElement {
  const { handler, days } = props;

  return (
    <TextField
      id="actions"
      select
      label="Action"
      defaultValue={days[0]}
      sx={{ marginTop: "0.5em", minWidth: "6em", marginRight: "1em" }}
      onChange={handler}
    >
      {days.map((day, index) => {
        return (
          <MenuItem key={index} value={day}>
            {day}
          </MenuItem>
        );
      })}
    </TextField>
  );
}
