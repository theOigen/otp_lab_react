const styles = theme => ({
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        padding: '5%'
    },
    cardContent: {
        flexGrow: 1,
    },
    windIcon: {
        height: 20,
        float: 'left'
    }
})
export default styles