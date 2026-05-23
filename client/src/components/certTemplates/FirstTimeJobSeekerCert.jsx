const FirstTimeJobSeekerCert = ({ resident, formattedDate, data }) => (
  <>
    <p className="font-semibold">TO WHOM IT MAY CONCERN:</p>

    <p className="mt-4">
      THIS IS TO CERTIFY, that{" "}
      <span className="font-semibold underline">
        {resident.first_name} {resident.middle_name} {resident.last_name}
      </span>
      , <span className="font-semibold underline">{resident.age} </span> years
      old,{" "}
      <span className="font-semibold underline">{resident.civil_status}</span>,
      is a bonafide resident of Purok{" "}
      <span className="font-semibold underline">{resident.purok}</span>,
      Barangay 91 Abucay, Tacloban City, and is qualified to avail of RA 11261
      or the FIRST TIME JOB SEEKERS ACT of 2019.
    </p>

    <p className="mt-4">
      I further certify that the bearer was informed of his/her rights including
      the duties and responsibilities accorded by RA 11261 through Oath of
      Undertaking he/she has signed and executed in the presence of our Barangay
      Officials.
    </p>

    <p className="mt-4">
      Issued upon request of the interested party for{" "}
      <span className="font-semibold underline">{data.purpose}</span> and for
      whatever legal purpose it may serve.
    </p>

    <p className="mt-4 font-semibold">Issued this {formattedDate}.</p>
  </>
);

export default FirstTimeJobSeekerCert;
