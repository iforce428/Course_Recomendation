import React from "react";
import { useLocation } from "react-router-dom";

const Recommendation = () => {
  const location = useLocation();
  const { firstAppData, secondAppData } = location.state || {};

  
  const getFinalRecommendation = () => {
    // Ensure both firstAppData and secondAppData exist
    if (!firstAppData || !secondAppData) return null;
  
    const decisionTreeCourses = Array.isArray(secondAppData.recommendations)
      ? secondAppData.recommendations.map(rec => rec.course)
      : [];
  
    // Ensure recommended_courses exists and is an array
    const recommendedCourses = Array.isArray(firstAppData.recommendations)
      ? firstAppData.recommendations
      : [];
  
    // Find matched courses
    const matchedCourses = recommendedCourses.filter(course =>
      decisionTreeCourses.includes(course)
    );
  
    // If matched courses exist, return them
    if (matchedCourses.length > 0) {
      return matchedCourses;
    }
  
    return decisionTreeCourses.length > 0
      ? [decisionTreeCourses[0]] // Return the first decision tree course
      : []; // Add a fallback in case decisionTreeCourses is empty
  };
  
  const finalRecommendation = getFinalRecommendation();
  
  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "50px auto",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#f9f9f9",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#333",
          marginBottom: "20px",
        }}
      >
        Combined Recommendations
      </h1>

      {firstAppData && (
        <div
          style={{
            marginBottom: "20px",
            padding: "15px",
            border: "1px solid #ddd",
            borderRadius: "5px",
            backgroundColor: "#fff",
          }}
        >
          <h2
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              color: "#555",
              marginBottom: "10px",
            }}
          >
            SPM Grades-Based Recommendations:
          </h2>
          <ul
            style={{
              listStyleType: "disc",
              paddingLeft: "20px",
              color: "#333",
              lineHeight: "1.6",
            }}
          >
            {firstAppData.recommendations.map((rec, index) => (
              <li key={index}>{rec}</li>
            ))}
          </ul>
          <p
            style={{
              marginTop: "10px",
              fontSize: "16px",
              color: "#555",
            }}
          >
            <strong>Model Accuracy:</strong> {firstAppData.accuracy}
          </p>
        </div>
      )}

      {secondAppData && (
        <div
          style={{
            padding: "15px",
            border: "1px solid #ddd",
            borderRadius: "5px",
            backgroundColor: "#fff",
          }}
        >
          <h2
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              color: "#555",
              marginBottom: "10px",
            }}
          >
            Interest-Based Recommendations:
          </h2>
          <ul
            style={{
              listStyleType: "disc",
              paddingLeft: "20px",
              color: "#333",
              lineHeight: "1.6",
            }}
          >
            {secondAppData.recommendations.map((rec, index) => (
              <li key={index}>{rec.course}</li>
            ))}
          </ul>
          <p
            style={{
              fontSize: "16px",
              color: "#333",
              lineHeight: "1.6",
            }}
          >
            <strong>Model Accuracy:</strong> {secondAppData.accuracy}%
          </p>
        </div>
      )}
      {finalRecommendation && (
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            border: "1px solid #ddd",
            borderRadius: "5px",
            backgroundColor: "#fff",
          }}
        >
          <h2
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              color: "#555",
              marginBottom: "10px",
            }}
          >
            Final Recommendations:
          </h2>
          <ul
            style={{
              listStyleType: "disc",
              paddingLeft: "20px",
              color: "#333",
              lineHeight: "1.6",
            }}
          >
            {finalRecommendation.map((course, index) => (
              <li key={index}>{course}</li>
            ))}
          </ul>
        </div>
      )}
      {!firstAppData && !secondAppData && (
        <p
          style={{
            textAlign: "center",
            fontSize: "16px",
            color: "#999",
            marginTop: "20px",
          }}
        >
          No recommendations available. Please complete the previous steps.
        </p>
      )}
    </div>
  );
};

export default Recommendation;
