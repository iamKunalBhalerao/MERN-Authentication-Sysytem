export const DBName = "MERN-Auth";

export const options = {
  httpOnly: true,
  secure: true,
};

export const welcomeMailTemplate = ({ username }) => {
  const mailHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome!</title>
</head>
<body style="margin: 0; padding: 0; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
    <!-- Main Container -->
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh;">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                <!-- Email Container -->
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="500" style="max-width: 500px; background-color: #ffffff; border-radius: 20px; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15); overflow: hidden;">
                    
                    <!-- Stunning Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 70%, #f093fb 100%); padding: 0; position: relative; overflow: hidden;">
                            <!-- Floating Elements -->
                            <div style="position: absolute; top: 20px; right: 20px; width: 60px; height: 60px; background: rgba(255, 255, 255, 0.1); border-radius: 50%;"></div>
                            <div style="position: absolute; bottom: 30px; left: 30px; width: 40px; height: 40px; background: rgba(255, 255, 255, 0.15); border-radius: 50%;"></div>
                            
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td align="center" style="padding: 60px 40px; position: relative; z-index: 2;">
                                        <!-- Animated Logo -->
                                        <div style="background: linear-gradient(45deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1)); width: 80px; height: 80px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 24px; backdrop-filter: blur(15px); border: 2px solid rgba(255, 255, 255, 0.3);">
                                            <span style="font-size: 36px;">🎉</span>
                                        </div>
                                        
                                        <!-- Welcome Title -->
                                        <h1 style="color: #ffffff; font-size: 32px; font-weight: 800; margin: 0; text-align: center; line-height: 1.2; text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
                                            Welcome ${username}
                                        </h1>
                                        <p style="color: rgba(255, 255, 255, 0.9); font-size: 18px; margin: 16px 0 0 0; text-align: center; font-weight: 300;">
                                            Your journey starts here ✨
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Main Content -->
                    <tr>
                        <td style="padding: 50px 40px;">
                            <!-- Personal Greeting -->
                            <h2 style="color: #1f2937; font-size: 24px; font-weight: 700; margin: 0 0 24px 0; text-align: center;">
                                Hi ${username}! 👋
                            </h2>
                            
                            <!-- Welcome Message -->
                            <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 32px 0; text-align: center;">
                                Thank you for joining us! We're thrilled to have you as part of our community. Get ready for an amazing experience ahead.
                            </p>
                            
                            <!-- Key Benefit -->
                            <div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border-radius: 16px; padding: 24px; margin: 0 0 32px 0; text-align: center; border: 1px solid rgba(59, 130, 246, 0.1);">
                                <div style="font-size: 32px; margin-bottom: 12px;">🚀</div>
                                <h3 style="color: #1e40af; font-size: 18px; font-weight: 600; margin: 0 0 8px 0;">
                                    Ready in 60 Seconds
                                </h3>
                                <p style="color: #3730a3; font-size: 14px; margin: 0; line-height: 1.4;">
                                    Everything is set up and ready to go. Just click below to get started!
                                </p>
                            </div>
                            
                            <!-- CTA Button -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td align="center">
                                        <a href="{{LoginURL}}" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; padding: 16px 32px; border-radius: 50px; font-weight: 600; font-size: 16px; box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4); transition: all 0.3s ease;">
                                            🎯 Get Started Now
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Compact Footer -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #1f2937 0%, #374151 100%); padding: 32px 40px; text-align: center;">
                            <!-- Social Links -->
                            <div style="margin-bottom: 20px;">
                                <a href="{{TwitterURL}}" style="display: inline-block; width: 40px; height: 40px; background: linear-gradient(45deg, #1da1f2, #0d8bd9); border-radius: 50%; text-align: center; line-height: 40px; color: #ffffff; text-decoration: none; margin: 0 8px; font-size: 16px;">𝕏</a>
                                <a href="{{FacebookURL}}" style="display: inline-block; width: 40px; height: 40px; background: linear-gradient(45deg, #4267b2, #365899); border-radius: 50%; text-align: center; line-height: 40px; color: #ffffff; text-decoration: none; margin: 0 8px; font-size: 16px;">f</a>
                                <a href="{{LinkedInURL}}" style="display: inline-block; width: 40px; height: 40px; background: linear-gradient(45deg, #0077b5, #005885); border-radius: 50%; text-align: center; line-height: 40px; color: #ffffff; text-decoration: none; margin: 0 8px; font-size: 14px;">in</a>
                            </div>
                            
                            <!-- Contact Info -->
                            <p style="color: #d1d5db; font-size: 14px; margin: 0 0 12px 0;">
                                Questions? Email us at <a href="mailto:support@company.com" style="color: #60a5fa; text-decoration: none;">support@company.com</a>
                            </p>
                            <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                                © 2024 Your Company • <a href="{{UnsubscribeURL}}" style="color: #9ca3af; text-decoration: underline;">Unsubscribe</a>
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;
  return mailHTML;
};
