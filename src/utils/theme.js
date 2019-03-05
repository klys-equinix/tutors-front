import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

export const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#64be34',
            contrastText: '#fff'
        },
      error: {
        main: '#ff0000',
        contrastText: '#fff'
      }
    },
    typography: {
        useNextVariants: true,
    },
});