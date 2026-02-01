const demoMemories = {
  2005: ['/memories/2005/1.webp', '/memories/2005/2.jpeg'],
  2011: [
    '/memories/2011/1.webp',
    '/memories/2011/2.jpg',
    '/memories/2011/3.webp',
    '/memories/2011/4.jpg',
  ],
  2015: [
    '/memories/2015/1.png',
    '/memories/2015/2.webp',
    '/memories/2015/3.jpg',
  ],
  2017: [
    '/memories/2017/1.jpg',
    '/memories/2017/2.jpg',
    '/memories/2017/3.jpg',
  ],
  2019: ['/memories/2019/1.webp', '/memories/2019/2.webp'],
  2020: ['/memories/2020/1.jpg', '/memories/2020/2.webp'],
  2025: ['/memories/2025/1.jpg', '/memories/2025/2.jpg'],
  2027: ['/memories/2027/1.png', '/memories/2027/2.png'],
};

export const getAllDemoMemories = () => {
  const memories = [];
  Object.entries(demoMemories).forEach(([year, images]) => {
    images.forEach((image) => {
      memories.push({ image, year: year.toString() });
    });
  });
  return memories;
};

export const getDemoMemoriesByYear = (year) => {
  const yearKey = parseInt(year);
  const images = demoMemories[yearKey] || [];
  return images.map((image) => ({ image, year: year.toString() }));
};

export const getAvailableYears = () => {
  return Object.keys(demoMemories)
    .map(Number)
    .sort((a, b) => a - b);
};

export default demoMemories;
