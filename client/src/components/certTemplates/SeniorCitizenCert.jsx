const SeniorCitizenCert = ({ resident, formattedDate }) => (
  <>
    <p className="font-semibold">TO WHOM IT MAY CONCERN:</p>

    <p className="mt-4">
      THIS IS TO CERTIFY, that{" "}
      <span className="font-semibold">
        {resident.first_name} {resident.middle_name} {resident.last_name}
      </span>
      , {resident.age} years old, Filipino, {resident.civil_status}, and a
      bonafide resident of Barangay 91 Abucay, Tacloban City, with postal
      address at {resident.address}.
    </p>

    <p className="mt-4">
      He/She has no derogatory records as far as this Barangay is concerned and
      is a registered voter.
    </p>

    <p className="mt-4 font-semibold">FOR SENIOR CITIZEN IDENTIFICATION CARD</p>

    <p className="mt-4">
      Issued this {formattedDate} at Barangay 91 Abucay, Tacloban City.
    </p>
  </>
);

export default SeniorCitizenCert;
