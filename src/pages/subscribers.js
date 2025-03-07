import { useEffect, useState } from "react";

const Subscribers = () => {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    fetch("/api/subscribe")
      .then((res) => res.json())
      .then((data) => setEmails(data.emails))
      .catch((err) => console.error("Error fetching emails:", err));
  }, []);

  return (
    <div className=" mx-auto p-4 text-white bg-black w-full">

      <div className="md:w-10/12 mx-auto">
      <h1 className="text-xl font-bold mb-4">Subscribers</h1>
      <ul className="list-disc pl-5">
        {emails.map((email, index) => (
          <li key={index} className="border-b py-2">{email}</li>
        ))}
      </ul>
      </div>
     
    </div>
  );
};

export default Subscribers;
