import useFetch from "../../../hooks/useFetch";

const Company = ({ pageTitle, currentPage }) => {
  const { data, loading, error } = useFetch("http://localhost:8000/company");

  if (pageTitle != currentPage) return;
  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur lors du chargement des données.</p>;

  return (
    <div className="container">
      <h2>Fournisseurs</h2>
      <table className="dash-table ">
        <thead>
          <tr>
            <th>N°</th>
            <th>Raison social</th>
          </tr>
        </thead>
        <tbody>
          {data.map((el, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>{el.socialReason}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Company;
