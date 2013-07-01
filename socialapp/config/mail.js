// Copy in your particulars and rename this to mail.js
module.exports = {
  service: "SendGrid",
  host: "smtp.123-reg.co.uk",
  port: 587,
  secureConnection: false,
  //name: "servername",
  auth: {
    user: "info@dekatzu.co.uk",
    pass: "samatron023"
  },
  ignoreTLS: false,
  debug: false,
  maxConnections: 5 // Default is 5
}
