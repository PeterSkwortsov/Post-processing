import DrunkEffect from "./DrunkEffect"
import { forwardRef } from "react";


export default forwardRef(function Drunk(props) 
{    
    
    const effects = new DrunkEffect();

    return <primitive object={effects} />
})