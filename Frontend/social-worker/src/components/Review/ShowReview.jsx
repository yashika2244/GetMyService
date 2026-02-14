import React, { useEffect, useState } from "react";
import { BASE_URL, token } from "../../config.js";

const ShowReviews = ({ serviceProviderId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/reviews/${serviceProviderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (Array.isArray(data)) {
        setReviews(data);
      } else {
        setReviews([]);
      }
    } catch (err) {
      console.error("Fetch reviews error:", err);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (serviceProviderId) fetchReviews();
  }, [serviceProviderId]);

  if (loading) return <p>Loading reviews...</p>;
  if (!Array.isArray(reviews) || reviews.length === 0)
    return <p>No reviews yet.</p>;

  return (
    <div className="space-y-4">
      {reviews.map((rev) => (
        <div key={rev._id} className="p-4 bg-white rounded shadow">
          <div className="flex items-center mb-2">
            {rev.reviewer?.photo && (
              <img
                src={rev.reviewer.photo}
                alt={rev.reviewer.name || "Reviewer"}
                className="w-8 h-8 rounded-full mr-2 border"
              />
            )}
            <span className="font-semibold">
              {rev.reviewer?.name || "Unknown"}
            </span>
            <span className="ml-auto">{rev.rating}⭐</span>
          </div>
          <p>{rev.comment}</p>
        </div>
      ))}
    </div>
  );
};

export { ShowReviews };
