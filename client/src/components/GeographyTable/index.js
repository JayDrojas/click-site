import "./geographytable.css";

const GeographyTable = ({ stateClicks }) => {
  return (
    <div className="clicks-table">
      <h2>Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>State</th>
            <th>Clicks</th>
          </tr>
        </thead>
        <tbody>
          {stateClicks.length === 0 ? (
            <></>
          ) : (
            stateClicks
              .sort((a, b) => b.clicks - a.clicks)
              .map((state, idx) => (
                <tr key={state._id}>
                  <td>{idx + 1}</td>
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
