const data = [
    { id: 1, stars: "***", name: "Kung Fu Tea"}, 
    { id: 2, stars: "**", name: "T Baar"}, 
    { id: 3, stars: "****", name: "Wanpo Tea Shop"},
    { id: 4, stars: "****", name: "Ten Ren"}, 
    { id: 5, stars: "****", name: "Teazzi"},
    { id: 6, stars: "****", name: "GongCha"}, 
    { id: 7, stars: "*****", name: "Jooy"},
    { id: 8, stars: "****", name: "Chun Yang Tea"},
    { id: 9, stars: "****", name: "Tiger Sugar"},
    { id: 10, stars: "****", name: "TrueDan"},
    { id: 11, stars: "***", name: "ViVi Bubble Tea"},
    { id: 12, stars: "****", name: "Lazy Sundaes"},
    { id: 13, stars: "***", name: "Prince Tea House"},
    { id: 14, stars: "*****", name: "Yifang Taiwan Fruit Tea"}, 
  ];

  const list = () => {
      return [...data]
  };

  const find = (id) => {
      const datas = data.find(datas => datas.id === +id)
      return {...datas}
    };

  module.exports = {
      list: list,
      find: find
  };
