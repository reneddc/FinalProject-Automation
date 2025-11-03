export const NotificationLocators = {
  notificationButton:
    '//div[@class="op-app-menu--item position-relative px-1"]',
  sideMenuNotification: '//div[@id="menu-sidebar"]',
  notificationContainer:
    '#//div[@class="op-ian-center--content op-ian-center--content_empty"]-body',
  unreadButton: "//segmented-control[1]//ul[1]//li[1]",
  allButton: "//segmented-control[1]//ul[1]//li[2]",
  allContainer: '//div[@id="wrapper"]',
  firsAlltNotification: "//op-in-app-notification-entry[1]",
  optionGeneratePDF: 'a[aria-label="Generate PDF"]',
  confirmationButton: 'button[type="submit"]',
  moreButton: 'button[title="More"]',
  setReminderButton: '//button[@title="Set reminder"]',
  successMesageReminderContainer:
    '//div[@class="Banner flash Banner--success flash-success"]',
  successMessage: '//p[@class="Banner-title"]',
  modalSetReminderContainer:
    '//div[@class="spot-modal op-reminder-dialog-modal"]',
  createReminderButton:
    '//button[@class="Button--primary Button--medium Button"]',
  activityOption:
    '//div[@class="op-work-package-details-tab-component d-flex flex-row"]//li[2]',
  commentEmptyField: ".color-fg-muted.text-normal",
  commentInput: 'div[role="textbox"]',
  summitComment: 'button[value="Submit"]',
  dropDownTags: ".button--icon.icon-small.icon-pulldown",
  inicialTag: 'button[title="New"]',
  optionOnHold: '//button[@aria-label="On hold"]',
  textTag: '//span[contains(@class, "op-wp-status-button--text")]',
  priorityLabel: '//span[@data-test-selector="priority"]',
  priorityDropDown: ".inline-edit--active-field.priority input",
  modalSuccessfullPriority: ".op-toastr",
  priorityDisplayValue:
    'span.inline-edit--display-field[data-field-name="priority"]',
  succesPriorityToast: ".-success.op-toast",
  projectPhaseDropDown: '.span[aria-label="Project phase No value: Edit"]',
  editForm: '//*[@id="content-body"]/opce-notification-center',
  estimateWork: '//span[@aria-label="Work No value: Edit"]',
  workInput: '//input[@id="work_package_estimated_hours"]',
  saveWork: 'button[type="submit"]',
  estimateWorkModal: "#drop-modal-506",
  titleNotification:
    ".inline-edit--container subject work-packages--details--subject work-packages--subject-element -no-label",
};
