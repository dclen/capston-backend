import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function ValidationTextFields() {
  const [name, setName] = React.useState("");
  const [lastName, setLastName] = React.useState("");

  const [errors, setErrors] = React.useState({ nameError: "", lastNameError: "" });
  const [enableButton, setEnableButton]=React.useState(true);

  const firstRender = React.useRef({firstName:true});

  React.useEffect(
      ()=>{
        if (errors.nameError){
          setEnableButton(false)
        } else {
          setEnableButton(true)
        }
      },[errors])

  React.useEffect(
      ()=>{
        if (firstRender.current.firstName) {
          firstRender.current.firstName = false
          return
        }
        if (!name){
          setErrors(prevState => ({...prevState, nameError: "Name Required"}))
        } else if(name.length>4) {
          setErrors(prevState => ({...prevState, nameError: "Name Too Long"}))
        }else{
          setErrors(prevState => ({...prevState, nameError: ""}))
        }
      },[name])



  return (
      <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" }
          }}
          noValidate
          autoComplete="off"
      >
        <div>
          <TextField
              error={errors.nameError}
              id="outlined"
              label="Name"
              onChange={(e)=>setName(e.target.value)}
              helperText={errors.nameError}
          />


        </div>
        {enableButton&&<div>"button enabled"</div>}

      </Box>
  );
}