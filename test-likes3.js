const getBaseLikes = (id) => {
  const str = String(id);
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % 300 + 50;
};
console.log('title:', getBaseLikes("Christmas photoshoot"));
console.log('title1:', getBaseLikes("Young Woman with Goldfish"));
console.log('title2:', getBaseLikes("New Year celebration scene"));
console.log('title4:', getBaseLikes("Adorable Baby's First Christmas Photoshoot"));
