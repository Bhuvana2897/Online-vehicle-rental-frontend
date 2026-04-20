export default function ReviewList({ reviews = [] }) {
  return (
    <div className="card p-4">
      <h3 className="text-lg font-bold mb-3">User Reviews</h3>
      {reviews.length === 0 ? (
        <p className="text-slate-500">No reviews yet.</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review._id} className="border-b border-slate-100 pb-3">
              <p className="font-semibold">{review.user?.name}</p>
              <p>⭐ {review.rating}/5</p>
              <p className="text-slate-700">{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
