/**
 * WHITE HOUSE TENANT MANAGEMENT SYSTEM
 * Trigger Manager - TriggerManager.gs
 * 
 * This module handles all automated triggers for email scheduling.
 */

const TriggerManager = {

  /**
   * Set up time-based triggers for automated emails
   */
  setupTriggers() {
    // Delete existing triggers first
    this._deleteExistingTriggers();
    
    // Create new triggers
    console.log('Setting up triggers...');
    
    // Create a single daily trigger that will check dates and run appropriate functions
    ScriptApp.newTrigger('checkAndRunDailyTasks')
      .timeBased()
      .everyDays(1)
      .atHour(9)
      .create();
    
    console.log('Triggers set up successfully - daily check at 9:00 AM');
  },

  /**
   * Get information about current triggers
   */
  getTriggerInfo() {
    const triggers = ScriptApp.getProjectTriggers();
    const relevantTriggers = triggers.filter(trigger => 
      ['sendRentReminders', 'sendLatePaymentAlerts', 'sendMonthlyInvoices', 'checkAndRunDailyTasks'].includes(trigger.getHandlerFunction())
    );
    
    console.log('Current triggers:');
    relevantTriggers.forEach(trigger => {
      console.log(`- ${trigger.getHandlerFunction()}: ${trigger.getTriggerSource()}`);
    });
    
    return `Found ${relevantTriggers.length} relevant triggers`;
  },

  /**
   * Delete existing triggers to avoid duplicates
   * @private
   */
  _deleteExistingTriggers() {
    const triggers = ScriptApp.getProjectTriggers();
    const functionNames = ['sendRentReminders', 'sendLatePaymentAlerts', 'sendMonthlyInvoices', 'checkAndRunDailyTasks'];
    
    triggers.forEach(trigger => {
      if (functionNames.includes(trigger.getHandlerFunction())) {
        ScriptApp.deleteTrigger(trigger);
        console.log(`Deleted existing trigger for ${trigger.getHandlerFunction()}`);
      }
    });
  }
};
