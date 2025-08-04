/**
 * WHITE HOUSE TENANT MANAGEMENT SYSTEM
 * Email Manager - EmailManager.gs
 * 
 * This module handles all email communications including rent reminders,
 * late payment alerts, and monthly invoices.
 */

const EmailManager = {

  /**
   * Send rent reminders to all active tenants
   */
  sendRentReminders() {
    try {
      console.log('Sending rent reminders...');
      
      const tenants = this._getActiveTenants();
      let sentCount = 0;
      
      tenants.forEach(tenant => {
        if (tenant.email && tenant.name) {
          const subject = `Rent Reminder - Room ${tenant.roomNumber}`;
          const body = this._createRentReminderEmail(tenant);
          
          try {
            GmailApp.sendEmail(tenant.email, subject, body);
            sentCount++;
            console.log(`Rent reminder sent to ${tenant.name} (${tenant.email})`);
          } catch (emailError) {
            console.error(`Failed to send reminder to ${tenant.email}:`, emailError);
          }
        }
      });
      
      console.log(`Rent reminders sent to ${sentCount} tenants`);
      return `Rent reminders sent to ${sentCount} tenants`;
    } catch (error) {
      console.error('Error sending rent reminders:', error);
      throw error;
    }
  },

  /**
   * Send late payment alerts to tenants with overdue payments
   */
  sendLatePaymentAlerts() {
    try {
      console.log('Sending late payment alerts...');
      
      const tenants = this._getActiveTenants();
      const currentDate = new Date();
      let sentCount = 0;
      
      tenants.forEach(tenant => {
        if (this._isPaymentLate(tenant, currentDate) && tenant.email && tenant.name) {
          const subject = `Late Payment Notice - Room ${tenant.roomNumber}`;
          const body = this._createLatePaymentEmail(tenant);
          
          try {
            GmailApp.sendEmail(tenant.email, subject, body);
            sentCount++;
            console.log(`Late payment alert sent to ${tenant.name} (${tenant.email})`);
          } catch (emailError) {
            console.error(`Failed to send late payment alert to ${tenant.email}:`, emailError);
          }
        }
      });
      
      console.log(`Late payment alerts sent to ${sentCount} tenants`);
      return `Late payment alerts sent to ${sentCount} tenants`;
    } catch (error) {
      console.error('Error sending late payment alerts:', error);
      throw error;
    }
  },

  /**
   * Send monthly invoices to all active tenants
   */
  sendMonthlyInvoices() {
    try {
      console.log('Sending monthly invoices...');
      
      const tenants = this._getActiveTenants();
      let sentCount = 0;
      
      tenants.forEach(tenant => {
        if (tenant.email && tenant.name) {
          const subject = `Monthly Rent Invoice - Room ${tenant.roomNumber}`;
          const body = this._createMonthlyInvoiceEmail(tenant);
          
          try {
            GmailApp.sendEmail(tenant.email, subject, body);
            sentCount++;
            console.log(`Monthly invoice sent to ${tenant.name} (${tenant.email})`);
          } catch (emailError) {
            console.error(`Failed to send invoice to ${tenant.email}:`, emailError);
          }
        }
      });
      
      console.log(`Monthly invoices sent to ${sentCount} tenants`);
      return `Monthly invoices sent to ${sentCount} tenants`;
    } catch (error) {
      console.error('Error sending monthly invoices:', error);
      throw error;
    }
  },

  /**
   * Test function to preview rent reminder email
   */
  testRentReminder() {
    const tenants = this._getActiveTenants();
    if (tenants.length > 0) {
      const testTenant = tenants[0];
      console.log('Testing rent reminder with tenant:', testTenant.name);
      
      const subject = `TEST - Rent Reminder - Room ${testTenant.roomNumber}`;
      const body = this._createRentReminderEmail(testTenant);
      
      console.log('Subject:', subject);
      console.log('Body:', body);
      
      return 'Test rent reminder created (check logs for content)';
    } else {
      return 'No active tenants found for testing';
    }
  },

  /**
   * Get all active tenants from the Tenant sheet
   * @private
   */
  _getActiveTenants() {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAMES.TENANT);
    if (!sheet) {
      throw new Error('Tenant sheet not found');
    }
    
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    const tenants = [];
    
    // Find column indices
    const roomNumberCol = headers.indexOf('Room Number');
    const rentalPriceCol = headers.indexOf('Rental Price');
    const negotiatedPriceCol = headers.indexOf('Negotiated Price');
    const nameCol = headers.indexOf('Current Tenant Name');
    const emailCol = headers.indexOf('Tenant Email');
    const phoneCol = headers.indexOf('Tenant Phone');
    const statusCol = headers.indexOf('Room Status');
    const lastPaymentCol = headers.indexOf('Last Payment Date');
    const paymentStatusCol = headers.indexOf('Payment Status');
    
    // Process each row (skip header)
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      
      // Only include active tenants (not vacant rooms)
      if (row[statusCol] && row[statusCol].toString().toLowerCase() === 'occupied' && row[nameCol]) {
        tenants.push({
          roomNumber: row[roomNumberCol],
          rentalPrice: row[rentalPriceCol],
          negotiatedPrice: row[negotiatedPriceCol],
          name: row[nameCol],
          email: row[emailCol],
          phone: row[phoneCol],
          status: row[statusCol],
          lastPaymentDate: row[lastPaymentCol],
          paymentStatus: row[paymentStatusCol]
        });
      }
    }
    
    return tenants;
  },

  /**
   * Check if a tenant's payment is late
   * @private
   */
  _isPaymentLate(tenant, currentDate) {
    if (!tenant.lastPaymentDate) return true;
    
    const lastPayment = new Date(tenant.lastPaymentDate);
    const daysSincePayment = Math.floor((currentDate - lastPayment) / (1000 * 60 * 60 * 24));
    
    // Consider payment late if more than grace period days past due date
    const currentDay = currentDate.getDate();
    return currentDay >= EMAIL_CONFIG.LATE_PAYMENT_DAY && (daysSincePayment > EMAIL_CONFIG.LATE_PAYMENT_GRACE_DAYS || tenant.paymentStatus === 'Overdue');
  },

  /**
   * Create rent reminder email content
   * @private
   */
  _createRentReminderEmail(tenant) {
    const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });
    const rentAmount = tenant.negotiatedPrice || tenant.rentalPrice || 'N/A';
    
    return `
Dear ${tenant.name},

This is a friendly reminder that your rent payment for ${currentMonth} is due.

Room Details:
- Room Number: ${tenant.roomNumber}
- Monthly Rent: ${rentAmount}

Please ensure your payment is submitted by the due date to avoid any late fees.

If you have already made your payment, please disregard this message.

Thank you for being a valued tenant!

Best regards,
${EMAIL_CONFIG.MANAGEMENT_TEAM}
${EMAIL_CONFIG.PROPERTY_NAME}
    `.trim();
  },

  /**
   * Create late payment email content
   * @private
   */
  _createLatePaymentEmail(tenant) {
    const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });
    const rentAmount = tenant.negotiatedPrice || tenant.rentalPrice || 'N/A';
    
    return `
Dear ${tenant.name},

This is a notice that your rent payment for ${currentMonth} is now overdue.

Room Details:
- Room Number: ${tenant.roomNumber}
- Monthly Rent: ${rentAmount}
- Payment Status: OVERDUE

Please submit your payment immediately to avoid additional late fees and potential further action.

If you have already made your payment or are experiencing financial difficulties, please contact us immediately to discuss payment arrangements.

Best regards,
${EMAIL_CONFIG.MANAGEMENT_TEAM}
${EMAIL_CONFIG.PROPERTY_NAME}
    `.trim();
  },

  /**
   * Create monthly invoice email content
   * @private
   */
  _createMonthlyInvoiceEmail(tenant) {
    const currentDate = new Date();
    const currentMonth = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
    const rentAmount = tenant.negotiatedPrice || tenant.rentalPrice || 'N/A';
    const dueDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), EMAIL_CONFIG.RENT_DUE_DAY);
    
    return `
Dear ${tenant.name},

Please find your monthly rent invoice below:

INVOICE - ${currentMonth}
Room Number: ${tenant.roomNumber}
Tenant: ${tenant.name}
Amount Due: ${rentAmount}
Due Date: ${dueDate.toLocaleDateString()}

Please ensure payment is submitted by the due date.

If you have any questions about this invoice, please don't hesitate to contact us.

Thank you!

Best regards,
${EMAIL_CONFIG.MANAGEMENT_TEAM}
${EMAIL_CONFIG.PROPERTY_NAME}
    `.trim();
  }
};
