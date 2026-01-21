const IndigencyCert = ({ resident, formattedDate, data }) => (
  <>
    <p className="text-lg">TO WHOM IT MAY CONCERN:</p>

    <p className="text-lg mt-4">
      THIS IS TO CERTIFY, that{" "}
      <span className="font-semibold underline">
        {resident.first_name} {resident.middle_name} {resident.last_name}
      </span>
      , <span className="font-semibold underline">{resident.age}</span> years
      old,{" "}
      <span className="font-semibold underline">{resident.civil_status}</span>,
      is a bonafide resident of{" "}
      <span className="font-semibold underline">{resident.purok}</span>,
      Barangay 91 Abucay, Tacloban City.
    </p>

    <p className="mt-4 text-lg">
      This further certifies that he/she belongs to an indigent family in this
      barangay.
    </p>

    <p className="mt-4 text-lg">
      Issued upon request of the interested party for{" "}
      <span className="font-semibold underline">{data.purpose}</span> and for
      whatever legal purpose this may serve.
    </p>

    <p className="mt-4 text-lg">
      Issued this{" "}
      <span className="font-semibold underline">{formattedDate}</span>.
    </p>
  </>
);

export default IndigencyCert;
