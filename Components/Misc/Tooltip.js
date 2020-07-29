import withStyles from "@material-ui/core/styles/withStyles";
import Tooltip from "@material-ui/core/Tooltip";


const NewTooltip = withStyles((theme) => ({
    tooltip: {
        fontSize: 14,
        padding: 7
    },
}))(Tooltip);


export default NewTooltip
