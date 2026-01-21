const FirstTimeJobSeekerCert = ({ resident, formattedDate }) => (
  <>
    <p className="font-semibold">TO WHOM IT MAY CONCERN:</p>

    <p className="mt-4">
      THIS IS TO CERTIFY, that{" "}
      <span className="font-semibold">
        {resident.first_name} {resident.middle_name} {resident.last_name}
      </span>
      , {resident.age} years old, {resident.civil_status}, is a bonafide
      resident of Purok {resident.purok}, Barangay 91 Abucay, Tacloban City, and
      is qualified to avail of RA 11261 or the FIRST TIME JOB SEEKERS ACT of
      2019.
    </p>

    <p className="mt-4">
      The bearer was informed of his/her rights and responsibilities under RA
      11261.
    </p>

    <p className="mt-4">
      Issued upon request of the interested party for whatever legal purpose it
      may serve.
    </p>

    <p className="mt-4">Issued this {formattedDate}.</p>
  </>
);

export default FirstTimeJobSeekerCert;
