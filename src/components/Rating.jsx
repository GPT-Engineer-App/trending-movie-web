import React, { useState } from "react";

const Rating = ({ movieId, initialRating }) => {
  const [rating, setRating] = useState(initialRating);
  const [isSubmitVisible, setIsSubmitVisible] = useState(false);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    setIsSubmitVisible(true);
    // Here you would also send the new rating to your backend or API
  };

  const handleSubmit = () => {
    console.log(`Submitting rating ${rating} for movie ${movieId}`);
    // Add your API call or backend submission logic here
    setIsSubmitVisible(false);
  };

  return (
    <div className="flex items-center" suppressHydrationWarning>
      <div className="flex" suppressHydrationWarning>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`cursor-pointer ${star <= rating ? "text-yellow-500" : "text-gray-400"}`}
            onClick={() => handleRatingChange(star)}
            suppressHydrationWarning
          >
            ★
          </span>
        ))}
      </div>
      {isSubmitVisible && (
        <button
          className="ml-2 px-2 py-1 bg-blue-500 text-white rounded"
          onClick={handleSubmit}
          suppressHydrationWarning
        >
          Submit
        </button>
      )}
    </div>
  );
};

export default Rating;