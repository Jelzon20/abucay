const SeniorCitizenCert = ({ resident, formattedDate }) => (
  <>
    <p className="font-semibold">TO WHOM IT MAY CONCERN:</p>

    <p className="mt-4">
      <span className="font-semibold">THIS IS TO CERTIFY, that </span>
      <span className="font-semibold underline">
        {resident.first_name} {resident.middle_name} {resident.last_name}
      </span>
      , <span className="font-semibold underline">{resident.age}</span> years
      old, Filipino,{" "}
      <span className="font-semibold underline">{resident.civil_status}</span>,
      and a bonafide resident of Barangay 91 Abucay, with postal address at{" "}
      <span className="font-semibold underline">{resident.cur_address}</span>,
      has no derogatory records as far as this Barangay is concerned and a
      resident of this Barangay for more than{" "}
      <span className="font-semibold underline">{resident.length_of_stay}</span>{" "}
      year/s and a registered voter at Barangay 91 with precinct #{" "}
      <span className="font-semibold underline">{resident.precinct_no}</span>.
    </p>
    <p>
      Date of Birth:{" "}
      <span className="font-semibold underline">
        {new Date(resident.birthday)
          .toLocaleDateString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
          })
          .replace(/\//g, "-")}
      </span>
    </p>
    <p className="mt-4 font-semibold">FOR SENIOR CITIZEN IDENTIFICATION CARD</p>

    <p className="mt-4">
      Issued this {formattedDate} at Barangay 91 Abucay, Tacloban City.
    </p>
  </>
);

export default SeniorCitizenCert;
