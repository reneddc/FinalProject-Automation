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
  threeDotMenu: 'button[title="More"]',
  optionGeneratePDF: 'a[aria-label="Generate PDF"]',
  confirmationButton: 'button[type="submit"]',
};
