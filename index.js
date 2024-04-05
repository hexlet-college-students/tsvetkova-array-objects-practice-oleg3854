// task 1
const normalizeData = (content) => {
  const [, ...data] = content.split('\n');
  data.pop();
  return data.map((item) => item.split(';'));
};

const getRatings = (data) => {
  const ratingsGP = data.map((item) => Number(item[2]));
  const ratingsAS = data.map((item) => Number(item[3]));
  // самый высокий средний рейтинг в Google Play
  const ratingGP = Math.max(...data.map((item) => Number(item[2])));
  // самый высокий средний рейтинг в App Store
  const ratingAppStore = Math.max(...data.map((item) => Number(item[3])));
  // название приложения
  const topMes = data[ratingsGP.indexOf(ratingGP)][0];
  // название компании-разработчика
  const owner = data[ratingsAS.indexOf(ratingAppStore)][1];
  return [topMes, owner];
};

const getDlIndia = (data) => {
  const maxDlIndia = Math.max(...data.map((item) => Number(item[6])));
  const minDlIndia = Math.min(...data.map((item) => Number(item[6])));
  return [maxDlIndia, minDlIndia];
};

const getPopAust = (data) => {
  const sortDlAustr = data.map((item) => Number(item[5])).sort((a, b) => b - a);
  const downloadAust = data.map((item) => Number(item[5]));
  const sortedTop3 = [
    data[downloadAust.indexOf(sortDlAustr[0])][0],
    data[downloadAust.indexOf(sortDlAustr[1])][0],
    data[downloadAust.indexOf(sortDlAustr[2])][0],
  ];
  return sortedTop3.sort();
};

const tableParsing = (content) => {
  const data = normalizeData(content);

  // task 1 step 1
  const [topMes, owner] = getRatings(data);
  console.log(`General top messenger: ${topMes}, Owner: ${owner}`);

  // task 1 step 2
  const [maxDlIndia, minDlIndia] = getDlIndia(data);
  console.log(`Download count: Max count: ${maxDlIndia}, Min count: ${minDlIndia}`);

  // task 1 step 3
  const [top1, top2, top3] = getPopAust(data);
  console.log(`Top-3 Australia: ${top1}, ${top2}, ${top3}`);
};

// task 2
const candidateAssessment = (/* content */) => {

};

// task 3
const actorRating = (/* content */) => {

};

export { tableParsing, candidateAssessment, actorRating };
