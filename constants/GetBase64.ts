export async function GetBase64(file: File): Promise<string> {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = e => res(reader.result as string);
    reader.onerror = e => rej(e);
    reader.readAsDataURL(file);
  });
}
