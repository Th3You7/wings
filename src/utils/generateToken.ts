function generateToken(length: number) {
  //edit the token allowed characters

  const a =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");

  const b = [];
  for (let i = 0; i < length; i++) {
    const j = parseInt((Math.random() * (a.length - 1)).toFixed(0), 10);
    b[i] = a[j];
  }
  return b.join("");
}

export default generateToken;
