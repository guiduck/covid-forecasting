import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://covid-19-statistics.p.rapidapi.com/reports'
})

api.defaults.headers['x-rapidapi-host'] = 'covid-19-statistics.p.rapidapi.com';
api.defaults.headers['x-rapidapi-key'] = '0b8b88299dmsh633d177b4830bb2p1f4e62jsn9a410c7e91fc'

api.interceptors.request.use(config => {
  console.log(config);
  return config;
});

export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get('https://api.covidtracking.com/v1/us/daily.json');

    return data.map(({ positive, recovered, death, dateChecked: date }) => ({ confirmed: positive, recovered, deaths: death, date }));
  } catch (error) {
    return error;
  }
};