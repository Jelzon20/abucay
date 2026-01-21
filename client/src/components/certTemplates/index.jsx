import IndigencyCert from "./IndigencyCert";
import SeniorCitizenCert from "./SeniorCitizenCert";
import FirstTimeJobSeekerCert from "./FirstTimeJobSeekerCert";

export const CERT_TEMPLATES = {
  "CERTIFICATE OF INDIGENCY": IndigencyCert,
  "BARANGAY CERTIFICATION (Senior Citizen)": SeniorCitizenCert,
  "BARANGAY CERTIFICATION (FIRST TIME JOB SEEKERS ACT –RA 11261)":
    FirstTimeJobSeekerCert,
};
