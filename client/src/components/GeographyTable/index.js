import './geographytable.css'

const GeographyTable = ({ stateClicks }) => {
  return (
    <div className='clicks-table' >
      <table>
        <thead>
          <tr>
            <th>State</th>
            <th>Clicks</th>
          </tr>
        </thead>
        <tbody>
          {stateClicks.length === 0 ? (
            <></>
          ) : (
            stateClicks.map((state) => (
              <tr key={state._id}>
                <td>{state.state}</td>
                <td>{state.clicks}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default GeographyTable;
