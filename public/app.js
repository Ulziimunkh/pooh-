import react from "react";
import{
    stylesheet,
    Text,
    view,
    imagebackground
}
from "react-native"
import { findByLabelText } from "@testing-library/react";
export default class web extends React.Component {
    render(){
        return (
            <imagebackground source={require("new project(1).jpg")}
            style={styles.comtainer}>
                <view style={styles.inner}><</view>
            </imagebackground>
        ):
    }
}
const styles = Stylesheet.create({
    container:{
        flex: 1,
        alignitems: "center"
        justifycontent: "center",
    
    },
    inner: {
        width:"80%"
        height: "80%"
        
    }
});