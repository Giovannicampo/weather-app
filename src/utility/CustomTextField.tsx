import TextField from "@mui/material/TextField";

interface TextFieldProps {
  readonly id: string;
  readonly label: string;
  readonly defaultValue: string;
  readonly handler: React.ChangeEventHandler;
}

export default function CustomTextField(
  props: TextFieldProps,
): React.ReactElement {
  return (
    <TextField
      autoFocus
      margin="dense"
      id={props.id}
      label={props.label}
      fullWidth
      variant="outlined"
      defaultValue={props.defaultValue}
      required
      onChange={props.handler}
    />
  );
}