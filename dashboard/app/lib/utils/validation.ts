/**
 * If the user touched and fill data for the fields, which defined on array requiredFields
 * The submit button should enable.
 * @param requiredFields - The required fields on form
 * @param dirtyFields - The fields, which the users touched and fill data on
 * @returns true if all required fields are filled and else.
 */
export const isEnableSubmitButton = (
  requiredFields: string[] = [],
  dirtyFields: string[] = [],
): boolean => {
  const isMatchAllRequiredFields: boolean = requiredFields.every((field) =>
    dirtyFields.includes(field),
  );

  return isMatchAllRequiredFields;
};
