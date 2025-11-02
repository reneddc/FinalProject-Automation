import { error } from "console";

export const workPackagesLocators = {
  createButton:'.wp-create-button',
  packageTypesContainer: '#types-context-menu',
  taskTypeOption: 'Task',
  errorMessageToaster:'.op-toast--wrapper',
  createNewWorkPackageButton: 'Create new work package',
  newRowInTable: '#wp-row-new-table',
  taskNameInputFromTable: '#wp-new-inline-edit--field-subject',
  packageTypeInputFromTable: '#wp-new-inline-edit--field-type',
  packageTypesContainerFromTable: '.ng-dropdown-panel-items.scroll-host',
  taskTypeOptionFromTable: '.ng-option.ng-option-marked',
  projectInputFromTable: '//ng-select[@id="" and contains(@class, "ng-select-typeahead")]',
  projectContainerFromTable: 'Options List',
  workPackageModuleProjectOption: 'Package Module Project'
};
