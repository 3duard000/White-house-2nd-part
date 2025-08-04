/**
 * WHITE HOUSE TENANT MANAGEMENT SYSTEM
 * Sheet Manager - SheetManager.gs
 * 
 * This module handles all sheet creation, formatting, column widths,
 * dropdowns, and conditional formatting.
 */

const SheetManager = {

  /**
   * Create all required sheets with headers and formatting
   */
  createRequiredSheets() {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    
    // Create all main sheets (including Guest Rooms)
    const mainSheets = ['TENANT', 'BUDGET', 'MAINTENANCE', 'GUEST_ROOMS'];
    
    mainSheets.forEach(key => {
      const sheetName = SHEET_NAMES[key];
      let sheet = spreadsheet.getSheetByName(sheetName);
      
      if (!sheet) {
        console.log(`Creating sheet: ${sheetName}`);
        sheet = spreadsheet.insertSheet(sheetName);
      }
      
      // Set headers if the sheet is empty or has different headers
      const headers = HEADERS[key];
      if (!headers) {
        console.log(`No headers defined for ${key}, skipping...`);
        return;
      }
      
      const lastRow = sheet.getLastRow();
      if (lastRow === 0) {
        // Sheet is completely empty, add headers
        this._addHeaders(sheet, headers);
        this._formatSheet(sheet, key);
        console.log(`Sheet "${sheetName}" created/updated with headers and formatting`);
      } else {
        // Check if headers match
        this._updateHeadersIfNeeded(sheet, headers, key);
      }
    });
  },

  /**
   * Add headers to a sheet
   * @private
   */
  _addHeaders(sheet, headers) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    
    // Format header row
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground(COLORS.HEADER_BLUE);
    headerRange.setFontColor('white');
    headerRange.setFontWeight('bold');
    headerRange.setHorizontalAlignment('center');
  },

  /**
   * Update headers if they don't match expected headers
   * @private
   */
  _updateHeadersIfNeeded(sheet, headers, key) {
    const existingHeaders = sheet.getRange(1, 1, 1, headers.length).getValues()[0];
    const existingHeadersString = existingHeaders.join('');
    const expectedHeadersString = headers.join('');
    
    if (existingHeadersString !== expectedHeadersString) {
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      this._formatSheet(sheet, key);
      console.log(`Sheet "${sheet.getName()}" headers updated`);
    }
  },

  /**
   * Apply formatting to a sheet (column widths, freezing, dropdowns, conditional formatting)
   * @private
   */
  _formatSheet(sheet, sheetKey) {
    // Set column widths
    this._setColumnWidths(sheet, sheetKey);
    
    // Freeze header row
    sheet.setFrozenRows(1);
    
    // Add dropdowns and conditional formatting
    this._addDropdownsAndFormatting(sheet, sheetKey);
  },

  /**
   * Set column widths for a sheet
   * @private
   */
  _setColumnWidths(sheet, sheetKey) {
    const columnWidths = COLUMN_WIDTHS[sheetKey];
    if (!columnWidths) return;
    
    // Apply column widths
    for (let i = 0; i < columnWidths.length; i++) {
      sheet.setColumnWidth(i + 1, columnWidths[i]);
    }
    
    console.log(`Column widths set for ${sheet.getName()}`);
  },

  /**
   * Add dropdown menus and conditional formatting to a sheet
   * @private
   */
  _addDropdownsAndFormatting(sheet, sheetKey) {
    switch(sheetKey) {
      case 'TENANT':
        this._formatTenantSheet(sheet);
        break;
      case 'GUEST_ROOMS':
        this._formatGuestRoomsSheet(sheet);
        break;
      case 'BUDGET':
        this._formatBudgetSheet(sheet);
        break;
      case 'MAINTENANCE':
        this._formatMaintenanceSheet(sheet);
        break;
    }
  },

  /**
   * Format Tenant sheet with dropdowns and conditional formatting
   * @private
   */
  _formatTenantSheet(sheet) {
    // Room Status dropdown (Column I - index 9)
    const roomStatusRange = sheet.getRange('I2:I1000');
    this._addDataValidation(roomStatusRange, DROPDOWN_OPTIONS.TENANT.ROOM_STATUS);
    
    // Payment Status dropdown (Column K - index 11)
    const paymentStatusRange = sheet.getRange('K2:K1000');
    this._addDataValidation(paymentStatusRange, DROPDOWN_OPTIONS.TENANT.PAYMENT_STATUS);
    
    // Conditional formatting for Payment Status
    const paymentConditionalRules = [
      this._createConditionalRule('Current', COLORS.LIGHT_GREEN, paymentStatusRange),
      this._createConditionalRule('Late', COLORS.LIGHT_ORANGE, paymentStatusRange),
      this._createConditionalRule('Overdue', COLORS.LIGHT_RED, paymentStatusRange)
    ];
    sheet.setConditionalFormatRules(paymentConditionalRules);
    
    console.log('✅ Tenant sheet dropdowns and formatting added');
  },

  /**
   * Format Guest Rooms sheet with dropdowns and conditional formatting
   * @private
   */
  _formatGuestRoomsSheet(sheet) {
    // Room Type dropdown (Column D)
    this._addDataValidation(sheet.getRange('D2:D1000'), DROPDOWN_OPTIONS.GUEST_ROOMS.ROOM_TYPE);
    
    // Status dropdown (Column J)
    const statusRange = sheet.getRange('J2:J1000');
    this._addDataValidation(statusRange, DROPDOWN_OPTIONS.GUEST_ROOMS.STATUS);
    
    // Payment Status dropdown (Column V)
    this._addDataValidation(sheet.getRange('V2:V1000'), DROPDOWN_OPTIONS.GUEST_ROOMS.PAYMENT_STATUS);
    
    // Booking Status dropdown (Column W)
    this._addDataValidation(sheet.getRange('W2:W1000'), DROPDOWN_OPTIONS.GUEST_ROOMS.BOOKING_STATUS);
    
    // Source dropdown (Column T)
    this._addDataValidation(sheet.getRange('T2:T1000'), DROPDOWN_OPTIONS.GUEST_ROOMS.SOURCE);
    
    // Conditional formatting for Status
    const guestStatusRules = [
      this._createConditionalRule('Available', COLORS.LIGHT_GREEN, statusRange),
      this._createConditionalRule('Occupied', COLORS.LIGHT_BLUE, statusRange),
      this._createConditionalRule('Maintenance', COLORS.LIGHT_RED, statusRange)
    ];
    sheet.setConditionalFormatRules(guestStatusRules);
    
    console.log('✅ Guest Rooms sheet dropdowns and formatting added');
  },

  /**
   * Format Budget sheet with dropdowns and conditional formatting
   * @private
   */
  _formatBudgetSheet(sheet) {
    // Type dropdown (Column B)
    const typeRange = sheet.getRange('B2:B1000');
    this._addDataValidation(typeRange, DROPDOWN_OPTIONS.BUDGET.TYPE);
    
    // Category dropdown (Column E)
    this._addDataValidation(sheet.getRange('E2:E1000'), DROPDOWN_OPTIONS.BUDGET.CATEGORY);
    
    // Payment Method dropdown (Column F)
    this._addDataValidation(sheet.getRange('F2:F1000'), DROPDOWN_OPTIONS.BUDGET.PAYMENT_METHOD);
    
    // Conditional formatting for Income/Expense
    const budgetTypeRules = [
      this._createConditionalRule('Income', COLORS.LIGHT_GREEN, typeRange),
      this._createConditionalRule('Expense', COLORS.LIGHT_RED, typeRange)
    ];
    sheet.setConditionalFormatRules(budgetTypeRules);
    
    console.log('✅ Budget sheet dropdowns and formatting added');
  },

  /**
   * Format Maintenance sheet with dropdowns and conditional formatting
   * @private
   */
  _formatMaintenanceSheet(sheet) {
    // Issue Type dropdown (Column D)
    this._addDataValidation(sheet.getRange('D2:D1000'), DROPDOWN_OPTIONS.MAINTENANCE.ISSUE_TYPE);
    
    // Priority dropdown (Column E)
    const priorityRange = sheet.getRange('E2:E1000');
    this._addDataValidation(priorityRange, DROPDOWN_OPTIONS.MAINTENANCE.PRIORITY);
    
    // Status dropdown (Column J)
    const maintenanceStatusRange = sheet.getRange('J2:J1000');
    this._addDataValidation(maintenanceStatusRange, DROPDOWN_OPTIONS.MAINTENANCE.STATUS);
    
    // Conditional formatting for Priority
    const priorityRules = [
      this._createConditionalRule('Low', COLORS.LIGHT_GREEN, priorityRange),
      this._createConditionalRule('Medium', COLORS.LIGHT_YELLOW, priorityRange),
      this._createConditionalRule('High', COLORS.LIGHT_ORANGE, priorityRange),
      this._createConditionalRule('Emergency', COLORS.LIGHT_RED, priorityRange)
    ];
    
    // Conditional formatting for Status
    const maintenanceStatusRules = [
      this._createConditionalRule('Completed', COLORS.LIGHT_GREEN, maintenanceStatusRange),
      this._createConditionalRule('In Progress', COLORS.LIGHT_BLUE, maintenanceStatusRange),
      this._createConditionalRule('Pending', COLORS.LIGHT_YELLOW, maintenanceStatusRange)
    ];
    
    // Combine all maintenance rules
    const allMaintenanceRules = priorityRules.concat(maintenanceStatusRules);
    sheet.setConditionalFormatRules(allMaintenanceRules);
    
    console.log('✅ Maintenance sheet dropdowns and formatting added');
  },

  /**
   * Add data validation (dropdown) to a range
   * @private
   */
  _addDataValidation(range, options) {
    const rule = SpreadsheetApp.newDataValidation()
      .requireValueInList(options)
      .setAllowInvalid(false)
      .build();
    range.setDataValidation(rule);
  },

  /**
   * Create a conditional formatting rule
   * @private
   */
  _createConditionalRule(textValue, backgroundColor, range) {
    return SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo(textValue)
      .setBackground(backgroundColor)
      .setRanges([range])
      .build();
  }
};
