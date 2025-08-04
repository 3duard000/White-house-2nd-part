/**
 * WHITE HOUSE TENANT MANAGEMENT SYSTEM
 * Main Entry Point - Main.gs
 * 
 * This is the main entry point for the White House property management system.
 * It coordinates all the different modules and provides the main setup function.
 */

/**
 * Create custom menu when spreadsheet opens
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  
  ui.createMenu('🏠 White House Manager')
    .addItem('⚙️ Initialize System', 'setupTenantManagement')
    .addSeparator()
    .addSubMenu(ui.createMenu('📧 Tenant Management')
      .addItem('💸 Rent Reminders', 'sendRentReminders')
      .addItem('⚠️ Late Payment Alerts', 'sendLatePaymentAlerts')
      .addItem('📋 Monthly Invoices', 'sendMonthlyInvoices'))
    .addToUi();
}

/**
 * Main setup function - run this first to initialize everything
 */
function setupTenantManagement() {
  try {
    console.log('Setting up Tenant Management System...');
    
    // Create sheets with headers and formatting
    SheetManager.createRequiredSheets();
    
    // Add sample data to demonstrate the system
    DataManager.addSampleData();
    
    // Create and link Google Forms
    FormManager.createGoogleForms();
    
    // Set up automated email triggers
    TriggerManager.setupTriggers();
    
    console.log('Setup completed successfully!');
    return 'Tenant Management System setup completed successfully! Check the execution log for form URLs.';
  } catch (error) {
    console.error('Setup failed:', error);
    throw new Error('Setup failed: ' + error.message);
  }
}

/**
 * Daily check function that runs the appropriate email functions based on the date
 * This is triggered automatically by the system
 */
function checkAndRunDailyTasks() {
  const today = new Date();
  const dayOfMonth = today.getDate();
  const currentHour = today.getHours();
  
  console.log(`Daily check running - Day: ${dayOfMonth}, Hour: ${currentHour}`);
  
  // Run on 1st of month at 9 AM - Rent Reminders
  if (dayOfMonth === 1 && currentHour === 9) {
    console.log('Running rent reminders...');
    EmailManager.sendRentReminders();
  }
  
  // Run on 1st of month at 9 AM (15 minutes later) - Monthly Invoices  
  if (dayOfMonth === 1 && currentHour === 9) {
    // Add a small delay to avoid sending both emails at exact same time
    Utilities.sleep(5000); // 5 second delay
    console.log('Running monthly invoices...');
    EmailManager.sendMonthlyInvoices();
  }
  
  // Run on 8th of month at 9 AM - Late Payment Alerts
  if (dayOfMonth === 8 && currentHour === 9) {
    console.log('Running late payment alerts...');
    EmailManager.sendLatePaymentAlerts();
  }
}

/**
 * Wrapper functions for manual email sending (called from menu)
 */
function sendRentReminders() {
  return EmailManager.sendRentReminders();
}

function sendLatePaymentAlerts() {
  return EmailManager.sendLatePaymentAlerts();
}

function sendMonthlyInvoices() {
  return EmailManager.sendMonthlyInvoices();
}

/**
 * Utility functions for testing and debugging
 */
function testRentReminder() {
  return EmailManager.testRentReminder();
}

function getTriggerInfo() {
  return TriggerManager.getTriggerInfo();
}
