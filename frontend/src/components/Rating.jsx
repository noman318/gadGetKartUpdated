// import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

// const Rating = ({ value, text, color }) => {
//   return (
//     <div className="rating">
//       <span>
//         {value >= 1 ? (
//           <FaStar />
//         ) : value >= 0.5 ? (
//           <FaStarHalfAlt />
//         ) : (
//           <FaRegStar />
//         )}
//       </span>
//       <span>
//         {value >= 2 ? (
//           <FaStar />
//         ) : value >= 1.5 ? (
//           <FaStarHalfAlt />
//         ) : (
//           <FaRegStar />
//         )}
//       </span>
//       <span>
//         {value >= 3 ? (
//           <FaStar />
//         ) : value >= 2.5 ? (
//           <FaStarHalfAlt />
//         ) : (
//           <FaRegStar />
//         )}
//       </span>
//       <span>
//         {value >= 4 ? (
//           <FaStar />
//         ) : value >= 3.5 ? (
//           <FaStarHalfAlt />
//         ) : (
//           <FaRegStar />
//         )}
//       </span>
//       <span>
//         {value >= 5 ? (
//           <FaStar />
//         ) : value >= 4.5 ? (
//           <FaStarHalfAlt />
//         ) : (
//           <FaRegStar />
//         )}
//       </span>
//       <span className="rating-text">{text && text}</span>
//     </div>
//   );
// };

// Rating.defaultProps = {
//   color: "#f8e825",
// };

// export default Rating;

import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Rating = ({ value, text, color }) => {
  const starComponents = [];

  for (let i = 1; i <= 5; i++) {
    if (value >= i) {
      // console.log("value", value);
      // console.log("i", i);
      starComponents.push(<FaStar key={i} />);
    } else if (value >= i - 0.5) {
      starComponents.push(<FaStarHalfAlt key={i} />);
    } else {
      starComponents.push(<FaRegStar key={i} />);
    }
  }
  // console.log("starComponents", starComponents);

  return (
    <div className="rating">
      {starComponents.map((star, index) => (
        <span key={index}>{star}</span>
      ))}
      <span className="rating-text">{text && text}</span>
    </div>
  );
};

Rating.defaultProps = {
  color: "#f8e825",
};

export default Rating;
