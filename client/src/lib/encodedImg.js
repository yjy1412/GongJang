export const changeImg = (bufferImg) => {
  const encodedImg = btoa(String.fromCharCode(...new Uint8Array(bufferImg))); 
  return encodedImg;
}