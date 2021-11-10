import { Backdrop, CircularProgress } from "@mui/material"

const ShowBackdrop = ({openBackdrop, setOpenBackdrop})=>{
    return (
        <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackdrop}
        onClick={() => setOpenBackdrop(false)}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    )
}

export default ShowBackdrop