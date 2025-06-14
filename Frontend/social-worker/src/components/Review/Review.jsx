import React, { useState } from 'react';
import { toast } from 'react-toastify';
import {BASE_URL, token} from '../../config.js'
import { FaStar } from 'react-icons/fa'; // FontAwesome Star icon

const ReviewForm = ({ serviceProviderId, onReviewSubmitted }) => {
    console.log("serviceProviderId in review:", serviceProviderId);
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(null);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const submitReview = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/reviews/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
        //   reviewee: serviceProviderId,
           revieweeId: serviceProviderId,
          rating,
          comment
        })
      });
      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        setComment('');
        setRating(5);
        if (onReviewSubmitted) onReviewSubmitted();
      } else {
        toast.error(data.message || 'Failed to submit review');
      }
    } catch (err) {
      toast.error('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submitReview} className="flex flex-col space-y-2 p-4 bg-white rounded shadow">
      <label className="flex items-center">
        <span className="mr-2">Rating:</span>
        {/* <select
          value={rating}
          onChange={(e) => setRating(parseInt(e.target.value, 10))}
          className="border rounded p-1"
        >
          {[1,2,3,4,5].map((n) => (
            <option key={n} value={n}>{n} Star{n > 1 ? 's' : ''}</option>
          ))}
        </select> */}
         {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            size={24}
            className={`cursor-pointer transition-colors mx-1 duration-200 ${star <= (hover || rating) ? 'text-yellow-400' : 'text-gray-300'}`}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(null)}
          />
        ))}
      </label>

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your review..."
        className="border rounded p-2 h-24 resize-none"
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  );
};

export default ReviewForm;