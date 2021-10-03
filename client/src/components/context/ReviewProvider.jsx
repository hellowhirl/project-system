import React, { useContext, useState, useEffect } from "react";
import axios from "axios";

const ReviewContext = React.createContext();

export function useReviews() {
  return useContext(ReviewContext);
}

export function ReviewProvider({ children }) {
  const [listOfReviews, setListOfReviews] = useState([]);
  const [createVisible, setCreateVisible] = useState(false);
  const [editReviewVisible, setEditReviewVisible] = useState(false);

  useEffect(() => {
    async function fetchData() {
      await axios.get("http://localhost:3001/reviews").then((response) => {
        setListOfReviews(response.data);
      });
    }
    fetchData();
  }, []);

  const store = {
    listOfReviews,
    setListOfReviews,
    createVisible,
    setCreateVisible,
    editReviewVisible,
    setEditReviewVisible,
  };

  return (
    <ReviewContext.Provider value={store}>{children}</ReviewContext.Provider>
  );
}
