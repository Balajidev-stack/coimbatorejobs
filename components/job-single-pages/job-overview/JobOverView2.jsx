import { formatSalary } from "../../../utils/formatSalary";
import { formatExpiryDate } from "../../../utils/jobExpiry";

// Data-driven job overview. Each row renders only when the corresponding
// data exists on the job - no placeholder/hardcoded values.
const JobOverView2 = ({ job }) => {
  const salary = formatSalary(job);
  const expiry = formatExpiryDate(job);
  const datePosted = job?.datePosted || job?.time || "";
  const location = job?.location || "";

  return (
    <ul>
      {datePosted && (
        <li>
          <i className="icon icon-calendar"></i>
          <h5>Date Posted:</h5>
          <span>{datePosted}</span>
        </li>
      )}
      {expiry && (
        <li>
          <i className="icon icon-expiry"></i>
          <h5>Expiration date:</h5>
          <span>{expiry}</span>
        </li>
      )}
      {location && (
        <li>
          <i className="icon icon-location"></i>
          <h5>Location:</h5>
          <span>{location}</span>
        </li>
      )}
      {salary && (
        <li>
          <i className="icon icon-salary"></i>
          <h5>Salary:</h5>
          <span>{salary}</span>
        </li>
      )}
    </ul>
  );
};

export default JobOverView2;
