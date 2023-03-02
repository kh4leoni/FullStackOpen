

const StatisticLine = ({text, value}) => {

   
    

    return (
        <table>
            <tbody>
            <tr style={{display: 'table', tableLayout: 'fixed', width: '18%'}}>
                <td>{text}</td>
                <td>{value}</td>
            </tr>
            </tbody>
        </table>
        
    );
}

export default StatisticLine;
