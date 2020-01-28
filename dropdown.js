/* global canvas createDropdownRow */
const dropdownElements = [[['info dropdown-toggle', '', 's', 'font', '<span id="change-type-text">Digits & Letter</span><u>s</u>'], 'change-type', [['0', 'Digits'], ['1', 'Letters'], ['2', 'Digits & Letters']]], [['info dropdown-toggle', '', 'r', 'sort', '<span id="change-case-text">Lower & Uppe</span><u>r</u>case'], 'change-case', [['0', 'Lowercase'], ['1', 'Uppercase'], ['2', 'Lower & Uppercase']]], [['info dropdown-toggle', '', 'c', 'palette', '<span id="change-color-text"><u>C</u>hange color</span>'], 'change-color', [['14', 'Custom color <input type="color" value="#ff0000" id="customColor" />'], ['15', 'Random (same color for each character)'], ['16', 'Random (different color for each character)'], ['17', 'Random (change colors in each update)']]]];
const dropdownRow = createDropdownRow(dropdownElements);
document.body.insertBefore(dropdownRow, canvas);
dropdownRow.children[2].children[1].children[0].id = 'custom';
