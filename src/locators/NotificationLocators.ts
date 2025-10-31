export const NotificationLocators = {
  notificationButton:
    '//div[@class="op-app-menu--item position-relative px-1"]',
  sideMenuNotification: '//div[@id="menu-sidebar"]',
  notificationContainer:
    '#//div[@class="op-ian-center--content op-ian-center--content_empty"]-body',
  unreadButton: "//segmented-control[1]//ul[1]//li[1]",
  allButton: "//segmented-control[1]//ul[1]//li[2]",
  allContainer:
    '//cdk-virtual-scroll-viewport[@class="cdk-virtual-scroll-viewport op-ian-center--viewport cdk-virtual-scrollable cdk-virtual-scroll-orientation-vertical"]',
  firsAlltNotification: "//op-in-app-notification-entry[1]",
  optionGeneratePDF: 'a[aria-label="Generate PDF"]',
  confirmationButton: 'button[type="submit"]',
  moreButton: 'button[title="More"]',
  setReminderButton: '//button[@title="Set reminder"]',
  //dropDownReminder: "reminder-dropdown-menu",
  //optionReminderTomorrow: 'button[aria-label="Tomorrow"]',
  successMesageReminderContainer:
    '//div[@class="Banner flash Banner--success flash-success"]',
  successMessage: '//p[@class="Banner-title"]',
  modalSetReminderContainer:
    '//div[@class="spot-modal op-reminder-dialog-modal"]',
  createReminderButton:
    '//button[@class="Button--primary Button--medium Button"]',
  duplicateNotificationOption: '//a[@aria-label="Duplicate"]',
};
