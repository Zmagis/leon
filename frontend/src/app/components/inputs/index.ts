import { Checkbox, Input, Select } from 'antd';

import { formInput } from 'app/components/inputs/common/form-input';

const InputField = formInput(Input);
const PasswordInputField = formInput(Input.Password);
const SelectField = formInput(Select);
const CheckBoxField = formInput(Checkbox);

export {
    InputField,
    PasswordInputField,
    SelectField,
    CheckBoxField,
};
