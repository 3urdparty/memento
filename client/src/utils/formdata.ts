export const objectToFormData = (obj: any, formData = new FormData(), parentKey = ''): FormData => {
  for (const [key, value] of Object.entries(obj)) {

    const keyName = parentKey ? `${parentKey}[${key}]` : key;

    if (value instanceof Date) {
      formData.append(keyName, value.toISOString());
    } else if (value instanceof File) {
      formData.append(keyName, value, value.name);
    } else if (Array.isArray(value)) {
      for (let i = 0; i < value.length; i++) {
        objectToFormData(value[i], formData, `${keyName}[${i}]`);
      }
    } else if (typeof value === 'object' && value !== null) {
      objectToFormData(value, formData, keyName);
    } else {
      // TODO: handle boolean, number, string, null, undefined
      // TODO: Type this object
      formData.append(keyName, value.toString());
    }
  }

  return formData;
}
