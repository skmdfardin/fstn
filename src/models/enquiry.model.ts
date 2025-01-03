import db from "../config/database.js";

interface Enquiry {
  name: string;
  email: string;
  mobile: string;
  isWhatsapp: boolean;
}

export const createEnquiry = (enquiry: Enquiry) => {
  const stmt = db.prepare(`
    INSERT INTO enquiries (name, email, mobile, isWhatsapp)
    VALUES (?, ?, ?, ?)
  `);

  return stmt.run(
    String(enquiry.name),
    String(enquiry.email),
    String(enquiry.mobile),
    enquiry.isWhatsapp ? 1 : 0
  );
};
