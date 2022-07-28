import { useState } from "react";

function Checkbox(){
    const [status, setStatus] = useState({isChecked: false});

    function handleChange(){
        setStatus({isChecked: !status.isChecked});
    }

    return (
        <div>
            <label>{status.isChecked ? "Active" : "Inactive"}</label>
            <input type="checkbox" checked={status.isChecked} onChange={handleChange}/>
        </div>
    )
}

export default Checkbox;