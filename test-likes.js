const getBaseLikes = (id) => {
  const str = String(id);
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % 300 + 50;
};
console.log('1:', getBaseLikes('1'));
console.log('2:', getBaseLikes('2'));
console.log('3:', getBaseLikes('3'));
console.log('4:', getBaseLikes('4'));
console.log('5:', getBaseLikes('5'));
console.log('undefined:', getBaseLikes(undefined));
console.log('null:', getBaseLikes(null));
console.log('[object Object]:', getBaseLikes({}));
