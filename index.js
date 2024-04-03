// task 1
const normalizeData = (content) => {
  const [, ...data] = content.split('\n');
  data.pop();
  return data;
};

const tableParsing = (content) => {
  const data = normalizeData(content).map((item) => item.split(';'));
  console.log(data);
  // return data;
};

// task 2
const candidateAssessment = (/* content */) => {

};

// task 3
const actorRating = (/* content */) => {

};

export { tableParsing, candidateAssessment, actorRating };
