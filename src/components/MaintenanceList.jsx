export default function MaintenanceList({ records = [] }) {
  return (
    <div className="card p-4">
      <h3 className="text-lg font-bold mb-3">Maintenance Records</h3>
      {records.length === 0 ? (
        <p className="text-slate-500">No maintenance records found.</p>
      ) : (
        <div className="space-y-3">
          {records.map((item) => (
            <div key={item._id} className="rounded-lg border border-slate-200 p-3">
              <p className="font-semibold">{item.title}</p>
              <p className="text-sm">{item.details}</p>
              <p className="text-sm text-slate-600">Service Date: {new Date(item.serviceDate).toLocaleDateString()}</p>
              <p className="text-sm text-slate-600">Cost: ₹{item.cost}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
