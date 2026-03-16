const getBaseLikes = (id) => {
  const str = String(id);
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % 300 + 50;
};
console.log('image:', getBaseLikes("https://picsum.photos/seed/christmas-photoshoot/800/1000"));
console.log('image1:', getBaseLikes("https://picsum.photos/seed/woman-goldfish/800/1000"));
console.log('image2:', getBaseLikes("https://picsum.photos/seed/new-year/800/1000"));
console.log('image4:', getBaseLikes("https://picsum.photos/seed/baby-photoshoot/800/1000"));
