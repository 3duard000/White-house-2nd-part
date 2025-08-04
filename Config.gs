/**
 * WHITE HOUSE TENANT MANAGEMENT SYSTEM
 * Configuration File - Config.gs
 * 
 * This file contains all configuration constants, sheet names, headers,
 * and other system-wide settings that can be easily modified.
 */

/**
 * Sheet Names Configuration
 */
const SHEET_NAMES = {
  TENANT: 'Tenant',
  BUDGET: 'Budget',
  MAINTENANCE: 'Maintenance Requests',
  GUEST_ROOMS: 'Guest Rooms'
};

/**
 * Sheet Headers Configuration
 */
const HEADERS = {
  TENANT: [
    'Room Number', 'Rental Price', 'Negotiated Price', 'Current Tenant Name', 
    'Tenant Email', 'Tenant Phone', 'Move-In Date', 'Security Deposit Paid', 
    'Room Status', 'Last Payment Date', 'Payment Status', 'Move-Out Date (Planned)', 
    'Emergency Contact', 'Lease End Date', 'Notes'
  ],
  BUDGET: [
    'Date', 'Type', 'Description', 'Amount', 'Category', 'Payment Method', 
    'Reference Number', 'Tenant/Guest', 'Receipt'
  ],
  MAINTENANCE: [
    'Request ID', 'Timestamp', 'Room/Area', 'Issue Type', 'Priority', 
    'Description', 'Reported By', 'Contact Info', 'Assigned To', 'Status', 
    'Estimated Cost', 'Actual Cost', 'Date Started', 'Date Completed', 
    'Parts Used', 'Labor Hours', 'Photos', 'Notes'
  ],
  GUEST_ROOMS: [
    'Booking ID', 'Room Number', 'Room Name', 'Room Type', 'Max Occupancy', 
    'Amenities', 'Daily Rate', 'Weekly Rate', 'Monthly Rate', 'Status', 
    'Last Cleaned', 'Maintenance Notes', 'Check-In Date', 'Check-Out Date', 
    'Number of Nights', 'Number of Guests', 'Current Guest', 'Purpose of Visit', 
    'Special Requests', 'Source', 'Total Amount', 'Payment Status', 
    'Booking Status', 'Notes'
  ]
};

/**
 * Column Width Configuration
 */
const COLUMN_WIDTHS = {
  TENANT: [
    100, // Room Number
    120, // Rental Price
    130, // Negotiated Price
    180, // Current Tenant Name
    200, // Tenant Email
    130, // Tenant Phone
    120, // Move-In Date
    150, // Security Deposit Paid
    120, // Room Status
    130, // Last Payment Date
    120, // Payment Status
    150, // Move-Out Date (Planned)
    180, // Emergency Contact
    120, // Lease End Date
    200  // Notes
  ],
  BUDGET: [
    100, // Date
    100, // Type
    250, // Description
    100, // Amount
    120, // Category
    130, // Payment Method
    150, // Reference Number
    150, // Tenant/Guest
    150  // Receipt
  ],
  MAINTENANCE: [
    100, // Request ID
    130, // Timestamp
    120, // Room/Area
    120, // Issue Type
    90,  // Priority
    250, // Description
    150, // Reported By
    150, // Contact Info
    130, // Assigned To
    100, // Status
    120, // Estimated Cost
    120, // Actual Cost
    120, // Date Started
    130, // Date Completed
    150, // Parts Used
    100, // Labor Hours
    150, // Photos
    200  // Notes
  ],
  GUEST_ROOMS: [
    100, // Booking ID
    100, // Room Number
    150, // Room Name
    120, // Room Type
    120, // Max Occupancy
    200, // Amenities
    100, // Daily Rate
    100, // Weekly Rate
    100, // Monthly Rate
    100, // Status
    120, // Last Cleaned
    200, // Maintenance Notes
    120, // Check-In Date
    120, // Check-Out Date
    120, // Number of Nights
    120, // Number of Guests
    150, // Current Guest
    200, // Purpose of Visit
    200, // Special Requests
    100, // Source
    120, // Total Amount
    120, // Payment Status
    120, // Booking Status
    200  // Notes
  ]
};

/**
 * Dropdown Options Configuration
 */
const DROPDOWN_OPTIONS = {
  TENANT: {
    ROOM_STATUS: ['Occupied', 'Vacant', 'Maintenance', 'Reserved'],
    PAYMENT_STATUS: ['Current', 'Late', 'Overdue', 'Partial']
  },
  GUEST_ROOMS: {
    ROOM_TYPE: ['Standard', 'Deluxe', 'Premium', 'Suite', 'Executive'],
    STATUS: ['Available', 'Occupied', 'Reserved', 'Maintenance', 'Cleaning'],
    PAYMENT_STATUS: ['Paid', 'Pending', 'Deposit Paid', 'Cancelled', 'Refunded'],
    BOOKING_STATUS: ['Confirmed', 'Tentative', 'Cancelled', 'No-Show', 'Checked-In', 'Checked-Out'],
    SOURCE: ['Website', 'Phone', 'Email', 'Walk-in', 'Booking.com', 'Airbnb', 'Referral']
  },
  BUDGET: {
    TYPE: ['Income', 'Expense'],
    CATEGORY: ['Rent', 'Guest Revenue', 'Maintenance', 'Utilities', 'Insurance', 'Supplies', 'Marketing', 'Other'],
    PAYMENT_METHOD: ['Cash', 'Bank Transfer', 'Credit Card', 'Debit Card', 'Check', 'PayPal', 'Venmo']
  },
  MAINTENANCE: {
    ISSUE_TYPE: ['Plumbing', 'HVAC', 'Electrical', 'Appliance', 'Structural', 'Cleaning', 'Other'],
    PRIORITY: ['Low', 'Medium', 'High', 'Emergency'],
    STATUS: ['Pending', 'In Progress', 'Completed', 'Cancelled', 'On Hold']
  }
};

/**
 * Color Configuration for Conditional Formatting
 */
const COLORS = {
  LIGHT_GREEN: '#d9ead3',
  LIGHT_BLUE: '#cfe2f3', 
  LIGHT_RED: '#f4cccc',
  LIGHT_ORANGE: '#fce5cd',
  LIGHT_YELLOW: '#fff2cc',
  HEADER_BLUE: '#4285f4'
};

/**
 * Email Configuration
 */
const EMAIL_CONFIG = {
  PROPERTY_NAME: 'White House',
  MANAGEMENT_TEAM: 'Property Management Team',
  RENT_DUE_DAY: 1,
  LATE_PAYMENT_DAY: 8,
  LATE_PAYMENT_GRACE_DAYS: 35
};
