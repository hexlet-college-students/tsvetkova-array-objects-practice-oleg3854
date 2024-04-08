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

const numberOfDownload = (data) => {
  // Среднее количество скачиваний
  const averNumberOfDl = data.reduce((acc, item) => {
    const count = (Number(item[4]) + Number(item[5]) + Number(item[6]) + Number(item[7])) / 4;
    acc.push(count);
    return acc;
  }, []);
  // Среднее количество скачиваний + название приложений
  const averNumberName = averNumberOfDl.reduce((acc, item) => {
    const nameApp = data[averNumberOfDl.indexOf(item)][0];
    acc.push([item, nameApp]);
    return acc;
  }, []);
  // Сортируем массив скачиваний по возрастанию
  averNumberOfDl.sort((a, b) => a - b);
  // Создаем массив названий приложений по возрастанию по кол-ву  скачиваний
  // Signal, LINE, WeChat, Viber, Telegram, Snapchat, Facebook Messenger, WhatsApp
  const namesAverDl = averNumberOfDl.reduce((acc, item) => {
    const nameApp = averNumberName.filter((num) => num[0] === item);
    acc.push(nameApp[0][1]);
    return acc;
  }, []);
  // Возвращаем массив элементов в строку через запятую
  return namesAverDl.join(', ');
};

const topOwner = (data) => {
  const owners = data.reduce((acc, item) => {
    const owner = item[1];
    if (!Object.hasOwn(acc, owner)) {
      acc[owner] = 0;
    }
    acc[owner] += 1;
    return acc;
  }, {});
  // Создаем массив массивов ключей и значений
  // и фильтруем по значениям (если значение больше или равно двум)
  const ownersFilt = Object.entries(owners).filter((item) => item[1] >= 2);
  // Вытаскиваем названия компаний и превращаем их в строку
  const topOwners = ownersFilt.map((item) => item[0]).join(', ');
  return topOwners;
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

  // task 1 step 4
  const names = numberOfDownload(data);
  console.log(`Top downloads: ${names}`);

  // task 1 step 5
  const owners = topOwner(data);
  console.log(`Top owner: ${owners}`);
};

// task 2

const normalizeDataJob = (content) => {
  const data = content.split('\n');
  return data.map((item) => item.split(','));
};

const getNameSurname = (data) => {
  const [name, post] = [data[0], data[1]];
  return [name, post];
};

const frames = ['React', 'Angular', 'Vue.js', 'JQuery', 'Backbone.js', 'Node.js', 'Ember.js', 'Meteor'];

const getFrames = (data) => {
  // Убираем пробелы и приводим к нижнему регистру списки фреймворков
  const framesToLower = frames.map((item) => item.trim().toLowerCase());
  const framesNospace = data[5].map((item) => item.trim().toLowerCase());
  // Получаем список нужных нам фреймворков
  // React, Node.js, Angular, JQuery, Vue.js
  const listFrames = framesNospace.filter((item) => framesToLower.includes(item));
  // Выводим длину этого списка
  return listFrames.length;
};

const getGitName = (data) => {
  const socials = data[4].join(',').split(':')[1].split(',').map((item) => item.trim());
  const linkName = socials.map((item) => item.split('.')).filter((item) => item[0] === 'github').flat();
  const name = linkName[1].split('/')[1];
  return name;
};

const candidateAssessment = (content) => {
  const data = normalizeDataJob(content);

  // task 2 step 1
  const [name, post] = getNameSurname(data);
  console.log(`Job seeker: ${name[0]}, ${post[0]}`);

  // task 2 step 2
  const numOfFrames = getFrames(data);
  console.log(`Required stack: ${numOfFrames}`);

  // task 2 step 3
  const nickName = getGitName(data);
  console.log(`GitHub nickname: ${nickName}`);
};

// task 3
const actorRating = (/* content */) => {

};

export { tableParsing, candidateAssessment, actorRating };
