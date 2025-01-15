const verifyEmailTemplate = ({name, link}) => {
    return `
    
    <p>Dear ${name},</p>
     <p>Thank you for registering Blinkit</p>
     <a href=${link} style="color:white;background:blue;margin-top:10px">
     verify Email
     </a>
    
    `
}
export default verifyEmailTemplate;