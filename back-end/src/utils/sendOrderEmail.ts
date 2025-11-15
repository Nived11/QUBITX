import * as SibApiV3Sdk from "@sendinblue/client";
import dotenv from "dotenv";
dotenv.config();

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
apiInstance.setApiKey(
  SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY!
);

export const sendOrderPlacedEmail = async (
  email: string,
  name: string,
  orderId: string,
  amount: number,
  itemCount: number,
  orderDate?: string,
  estimatedDelivery?: string,
  items?: Array<{name: string, quantity: number, price: number, image?: string}>,
  orderDetailsUrl?: string  // Add order details URL parameter
) => {
  const formattedDate = orderDate || new Date().toLocaleDateString('en-IN', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  const deliveryDate = estimatedDelivery || new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  // Generate order details URL - customize based on your frontend routes
  const detailsUrl = orderDetailsUrl || `https://qubitx.netlify.app/profile/orders`;
  const trackingUrl = `https://qubitx.netlify.app/track/${orderId}`;
  const supportUrl = `https://qubitx.netlify.app/support`;
  try {
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

    sendSmtpEmail.sender = {
      name: "QubitX Team",
      email: "nived4148@gmail.com",
    };

    sendSmtpEmail.to = [{ email }];

    sendSmtpEmail.subject = "Order Confirmation - Order #" + orderId.slice(-8);
    sendSmtpEmail.htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; background-color: #f5f7fa; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f7fa; padding: 20px 0;">
          <tr>
            <td align="center">
              <!-- Main Container -->
              <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
                
                <!-- Header with branding -->
                <tr>
                  <td style="background-color: #ffffff; padding: 30px 30px 20px 30px; border-bottom: 3px solid #667eea;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td>
                          <h1 style="color: #2117b0; margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -0.5px;">
                            QubitX
                          </h1>
                        </td>
                        <td align="right">
                          <p style="color: #6b7280; font-size: 13px; margin: 0;">
                            Order Confirmation
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Success Banner -->
                <tr>
                  <td style="background-color: #ecfdf5; padding: 25px 30px; border-bottom: 1px solid #a7f3d0;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="50" valign="middle">
                          <div style="width: 40px; height: 40px; background-color: #10b981; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                            <span style="color: white; font-size: 24px; line-height: 40px; margin-left:10px; ">✓</span>
                          </div>
                        </td>
                        <td valign="middle" style="padding-left: 15px;">
                          <h2 style="color: #065f46; margin: 0; font-size: 20px; font-weight: 600;">
                            Order Placed Successfully
                          </h2>
                          <p style="color: #047857; margin: 5px 0 0 0; font-size: 14px;">
                            Thank you for your order, ${name}!
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Content -->
                <tr>
                  <td style="padding: 35px 30px;">
                    <p style="color: #374151; font-size: 15px; line-height: 1.6; margin: 0 0 25px 0;">
                      We're getting your order ready to ship. We'll notify you when it's on its way.
                    </p>

                    <!-- Order Info Grid -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 25px;">
                      <tr>
                        <td width="50%" style="padding-right: 10px;">
                          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; border-radius: 6px; border: 1px solid #e5e7eb;">
                            <tr>
                              <td style="padding: 15px;">
                                <p style="color: #6b7280; font-size: 12px; margin: 0 0 5px 0; text-transform: uppercase; letter-spacing: 0.5px;">
                                  Order Number
                                </p>
                                <p style="color: #111827; font-size: 15px; font-weight: 600; margin: 0;">
                                  #${orderId}
                                </p>
                              </td>
                            </tr>
                          </table>
                        </td>
                        <td width="50%" style="padding-left: 10px;">
                          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; border-radius: 6px; border: 1px solid #e5e7eb;">
                            <tr>
                              <td style="padding: 15px;">
                                <p style="color: #6b7280; font-size: 12px; margin: 0 0 5px 0; text-transform: uppercase; letter-spacing: 0.5px;">
                                  Order Date
                                </p>
                                <p style="color: #111827; font-size: 15px; font-weight: 600; margin: 0;">
                                  ${formattedDate}
                                </p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    <!-- Items Section -->
                    ${items && items.length > 0 ? `
                    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; margin-bottom: 25px;">
                      <tr>
                        <td style="padding: 20px; border-bottom: 2px solid #e5e7eb;">
                          <h3 style="color: #111827; margin: 0; font-size: 16px; font-weight: 600;">
                            Order Items (${itemCount})
                          </h3>
                        </td>
                      </tr>
                      ${items.map(item => `
                      <tr>
                        <td style="padding: 15px 20px; border-bottom: 1px solid #f3f4f6;">
                          <table width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td width="80" valign="top">
                                ${item.image ? `
                                <img src="${item.image}" alt="${item.name}" style="width: 70px; height: 70px; object-fit: cover; border-radius: 6px; border: 1px solid #e5e7eb;">
                                ` : `
                                <div style="width: 70px; height: 70px; background-color: #f3f4f6; border-radius: 6px; border: 1px solid #e5e7eb;"></div>
                                `}
                              </td>
                              <td valign="top" style="padding-left: 15px;">
                                <p style="color: #111827; font-size: 14px; font-weight: 600; margin: 0 0 5px 0;">
                                  ${item.name}
                                </p>
                                <p style="color: #6b7280; font-size: 13px; margin: 0;">
                                  Qty: ${item.quantity}
                                </p>
                              </td>
                              <td align="right" valign="top">
                                <p style="color: #111827; font-size: 15px; font-weight: 600; margin: 0;">
                                  ₹${item.price.toLocaleString('en-IN')}
                                </p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      `).join('')}
                    </table>
                    ` : `
                    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; margin-bottom: 25px;">
                      <tr>
                        <td style="padding: 20px;">
                          <p style="color: #6b7280; font-size: 14px; margin: 0;">
                            <strong style="color: #111827;">Total Items:</strong> ${itemCount}
                          </p>
                        </td>
                      </tr>
                    </table>
                    `}

                    <!-- Order Summary -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; border-radius: 8px; border: 1px solid #e5e7eb; margin-bottom: 25px;">
                      <tr>
                        <td style="padding: 20px;">
                          <h3 style="color: #111827; margin: 0 0 15px 0; font-size: 16px; font-weight: 600;">
                            Order Summary
                          </h3>
                          
                          <table width="100%" cellpadding="8" cellspacing="0">
                            <tr>
                              <td style="color: #6b7280; font-size: 14px;">Subtotal</td>
                              <td style="color: #111827; font-size: 14px; text-align: right;">
                                ₹${amount.toLocaleString('en-IN')}
                              </td>
                            </tr>
                            <tr>
                              <td style="color: #6b7280; font-size: 14px;">Shipping</td>
                              <td style="color: #10b981; font-size: 14px; text-align: right; font-weight: 600;">
                                FREE
                              </td>
                            </tr>
                            <tr style="border-top: 2px solid #e5e7eb;">
                              <td style="color: #111827; font-size: 16px; font-weight: 600; padding-top: 12px;">Total</td>
                              <td style="color: #2117b0; font-size: 20px; font-weight: 700; text-align: right; padding-top: 12px;">
                                ₹${amount.toLocaleString('en-IN')}
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    <!-- Delivery Estimate -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #eff6ff; border-radius: 8px; border: 1px solid #bfdbfe; margin-bottom: 25px;">
                      <tr>
                        <td style="padding: 20px;">
                          <table width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td width="40" valign="middle">
                                <span style="font-size: 28px;">📦</span>
                              </td>
                              <td valign="middle" style="padding-left: 12px;">
                                <p style="color: #1e40af; font-size: 13px; margin: 0 0 4px 0; font-weight: 600;">
                                  ESTIMATED DELIVERY
                                </p>
                                <p style="color: #1e3a8a; font-size: 15px; font-weight: 600; margin: 0;">
                                  ${deliveryDate}
                                </p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    <!-- CTA Button -->
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td align="center" style="padding: 10px 0 20px 0;">
                          <a href="${detailsUrl}" style="display: inline-block; background-color: #2117b0; color: #ffffff; text-decoration: none; padding: 14px 40px; border-radius: 6px; font-weight: 600; font-size: 15px;">
                            View Order Details
                          </a>
                        </td>
                      </tr>
                    </table>

                    <!-- Help Section -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="border-top: 1px solid #e5e7eb; margin-top: 20px; padding-top: 20px;">
                      <tr>
                        <td style="text-align: center;">
                          <p style="color: #6b7280; font-size: 14px; margin: 0 0 10px 0;">
                            Questions about your order?
                          </p>
                          <p style="color: #667eea; font-size: 14px; margin: 0; font-weight: 600;">
                            <a href="${supportUrl}" style="color: #2117b0; text-decoration: none;">Contact Support</a> | 
                            <a href="${trackingUrl}" style="color: #2117b0; text-decoration: none;">Track Order</a>
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 20px;">
                      <tr>
                        <td align="center">
                          <p style="color: #6b7280; font-size: 13px; margin: 0 0 15px 0;">
                            Download our app for exclusive deals
                          </p>
                          <table cellpadding="0" cellspacing="0" align="center">
                            <tr>
                              <td style="padding: 0 5px;">
                                <a href="#" style="display: inline-block;">
                                  <img src="https://via.placeholder.com/120x40/000000/FFFFFF?text=App+Store" alt="App Store" style="height: 35px; border-radius: 5px;">
                                </a>
                              </td>
                              <td style="padding: 0 5px;">
                                <a href="#" style="display: inline-block;">
                                  <img src="https://via.placeholder.com/120x40/000000/FFFFFF?text=Google+Play" alt="Google Play" style="height: 35px; border-radius: 5px;">
                                </a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td align="center" style="padding-bottom: 15px;">
                          <a href="${supportUrl}" style="color: #6b7280; text-decoration: none; font-size: 12px; padding: 0 8px; border-right: 1px solid #d1d5db;">Help Center</a>
                          <a href="${trackingUrl}" style="color: #6b7280; text-decoration: none; font-size: 12px; padding: 0 8px; border-right: 1px solid #d1d5db;">Track Order</a>
                          <a href="https://qubitx.com/returns" style="color: #6b7280; text-decoration: none; font-size: 12px; padding: 0 8px; border-right: 1px solid #d1d5db;">Return Policy</a>
                          <a href="${supportUrl}" style="color: #6b7280; text-decoration: none; font-size: 12px; padding: 0 8px;">Contact Us</a>
                        </td>
                      </tr>
                    </table>

                    <p style="color: #9ca3af; font-size: 12px; margin: 0 0 10px 0; line-height: 1.6;">
                      This email was sent to ${email} because you placed an order on QubitX.
                    </p>
                    <p style="color: #9ca3af; font-size: 11px; margin: 0; line-height: 1.5;">
                      © 2025 QubitX. All rights reserved.<br/>
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    await apiInstance.sendTransacEmail(sendSmtpEmail);
  } catch (err: any) {
    console.error("Failed to send order email:", err);
  }
};