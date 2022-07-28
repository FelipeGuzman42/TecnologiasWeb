import { FormattedMessage } from "react-intl";

function Device(props) {
    let devices = props.device;

    function renderDevices(){
        let i = 0;
        return devices.map((item) => (
            <tr key={item.id + i}>
                <td>{++i}</td>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.desired.value}</td>
            </tr>
        ))
    }

    if (!devices)
        return "";
    
    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">ID</th>
                        <th scope="col"><FormattedMessage id="Device"/></th>
                        <th scope="col"><FormattedMessage id="Value"/></th>
                    </tr>
                </thead>
                <tbody>
                    {renderDevices()}
                </tbody>
                </table>
        </div>
    );
}

export default Device;