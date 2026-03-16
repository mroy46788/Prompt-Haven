const getBaseLikes = (id) => {
  const str = String(id);
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % 300 + 50;
};
for (let i=1; i<=32; i++) {
  console.log(i + ':', getBaseLikes(String(i)));
}
